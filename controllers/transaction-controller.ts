import { Request, Response } from 'express';
import { ItemAttrs as ItemType } from '../models/Item';
import { Transaction, TransactionAttrs as TransactionType } from '../models/Transaction';
import { User } from "../models/User";
import { updateInventory } from '../utils/inventory-utils';
import { updateCart } from '../utils/cart-utils';
import { saveUserEvent } from '../utils/event-utils';
import { UserAction } from '../models/Constants';


/**
 * Gets all past user transactions if the user has any
 * @param req - Express request object
 * @param res - Express response object
 * @returns {TransactionType[]}
 */
export const getPastTransactions = async (req: Request, res: Response) => {
    // Get user transactions
    const userTransactions = await Transaction.find({ email: req.user.email });
    
    // Check if the user has any past transactions
    if(!userTransactions) {
        return res.status(400).json({ error: 'No past transactions found for the user' });
    }

    // Save the event
    await saveUserEvent({
        email: req.user.email,
        eventType: UserAction.GET_TRANSACTIONS,
        eventDescription: 'User retrieved past transactions',
        dateTime: new Date()
    });

    return res.status(200).json({ transactions: userTransactions });
}

/**
 * Route to simulate a user leaving the store to 'sign them out' or 'check out'
 * @param req - Express request object
 * @param res - Express response object
 * @returns {object} - JSON object if the request was successful
 */
 export const checkout = async (req: Request, res: Response) => {

    // Check if the user's cart is empty
    if(req.user.cart.length === 0) {
        return res.status(400).json({ error: 'No items in cart' });
    }

    // Get the user
    const user = await User.findOne({ sessionId: req.user.sessionId });

    // Update the items in the database that were purchased to reduce their quantity
    req.user.cart.forEach((item: ItemType) => updateInventory(item));

    // Get the total price
    let price = 0;
    req.user.cart.forEach(item => price += (item.price * item.quantity));
    // Save the transaction to the DB
    const transaction = Transaction.build({
        email: req.user.email,
        price,
        cart: req.user.cart,
        dateTime: new Date()
    });
    await transaction.save();

    // Empty the customer's cart
    await updateCart(req.user.sessionId, []);

    // Destroy the session and save to the DB
    user!.sessionId = '';
    await user!.save();

    // Save the event
    await saveUserEvent({
        email: req.user.email,
        eventType: UserAction.CHECKOUT,
        eventDescription: 'User left the store and checked out',
        dateTime: new Date()
    });

    return res.status(200).json({ transaction });
}