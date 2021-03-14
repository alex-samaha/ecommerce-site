import { Request, Response } from 'express';
import { Item, ItemAttrs as ItemType } from '../models/Item';
import { updateCart } from '../utils/cart-utils';
import { UserAction } from '../models/Constants';
import { saveUserEvent } from '../utils/event-utils';


/**
 * Test route to bulk add items to the database to test the customer shopping flow
 * @param req - Express Request object
 * @param res - Express Response object
 * @returns {object} - if the request was successful
 */
export const addItemsToDB = async (req: Request, res: Response) => {
    const items: ItemType[] = req.body.items;

    // Add each item to the DB
    items.forEach(async (item) => {
        const testItem = Item.build(item);
        await testItem.save();
    });

    return res.status(200).json({ success: true });
};

/**
 * Route for customers to add individual items to their cart
 * The item is added to the cart, and the cart contents are returned
 * @param req - Express request object
 * @param res - Express response object
 * @returns {ItemType[]} - the cart as a list of items
 */
export const addItemToCart = async (req: Request, res: Response) => {
    // Grab the item from the inventory
    const item = await Item.findOne({ id: req.params.id});

    if(!item) {
        return res.status(400).json({ error: 'Invalid item ID'});
    }

    // Check if there is already 1 of the that item in the cart
    // So that we can simply update the quantity of that item in the cart
    const itemIndex = req.user.cart.findIndex(item => item.id === req.params.id);

    // If this item doesn't exist in the cart already, set quantity to 1
    if(itemIndex < 0) {
        req.user.cart.push({
            name: item.name,
            price: item.price,
            quantity: 1,
            id: item.id
        });
    }
    // If there is already one occurence of this item, increment the quantity up 1
    else {
        const foundItem = req.user.cart[itemIndex];
        req.user.cart[itemIndex] = { ...foundItem, quantity: foundItem.quantity + 1 };
    }

    // Update the user's cart
    const updatedCart = await updateCart(req.user.sessionId, req.user.cart);

    // Save the event
    await saveUserEvent({
        email: req.user.email,
        eventType: UserAction.ADD_ITEM,
        eventDescription: `User added ${item.name} to their cart`,
        dateTime: new Date()
    });

    return res.status(200).json({ cart: updatedCart });
}

/**
 * Takes in an item ID and removes the specific item from the user's cart
 * Returns the contents of the users cart after updating
 * @param req - Express request object
 * @param res - Express response object
 * @returns {ItemType[]} - the users cart after removing the item
 */
export const removeItemFromCart = async (req: Request, res: Response) => {
    // Check to make sure the item is in the user's cart
    const itemIndex = req.user.cart.findIndex(item => item.id === req.params.id)
    
    if(itemIndex < 0) {
        return res.status(400).json({ error: "Item not in cart" });
    }

    const itemName = req.user.cart[itemIndex].name;
    // If the quantity of the item is 1, remove the object from the list
    if(req.user.cart[itemIndex].quantity === 1) {
        req.user.cart.splice(itemIndex, 1);
    }
    else {
        req.user.cart[itemIndex].quantity -= 1;
    }

    // Update the user's cart
    const updatedCart = await updateCart(req.user.sessionId, req.user.cart);

    // Save the event
    await saveUserEvent({
        email: req.user.email,
        eventType: UserAction.REMOVE_ITEM,
        eventDescription: `User removed ${itemName} to their cart`,
        dateTime: new Date()
    });

    return res.status(200).json({ cart: updatedCart });

}
