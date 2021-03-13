import { Request, Response } from 'express';
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
    })

    return res.status(200).json({ success: true });
}