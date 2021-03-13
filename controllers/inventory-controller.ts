import { Request, Response } from 'express';
import { User } from '../models/User';
import { Item, ItemAttrs as ItemType } from '../models/Item';


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
 */
export const addItemToCart = async (req: Request, res: Response) => {

    // Grab the current user from the sessionId
    const user = await User.findOne({ sessionId: req.sessionId });
    
    // Grab the item from the inventory
    const item = await Item.findOne({ id: req.params.id});

    if(!item) {
        return res.status(400).json({ error: 'Invalid item ID'});
    }

    // Check if there is already 1 of the that item in the cart
    // So that we can simply update the quantity of that item in the cart
    const itemIndex = user!.cart.findIndex(item => item.id === req.params.id);

    // If this item doesn't exist in the cart already, set quantity to 1
    if(itemIndex < 0) {
        user!.cart.push({
            name: item.name,
            price: item.price,
            quantity: 1,
            id: item.id
        });
        await user!.save();
    }
    // If there is already one occurence of this item, increment the quantity up 1
    else {
        let updatedCart = user!.cart;
        const foundItem = user!.cart[itemIndex];

        updatedCart[itemIndex] = { ...foundItem, quantity: foundItem.quantity + 1 };

        await User.updateOne(
            { "sessionId": req.sessionId },
            { "$set": { "cart": updatedCart } }
        );
    }

    const updatedUser = await User.findOne({ sessionId: req.sessionId })

    return res.status(200).json({ cart: updatedUser!.cart});
}
