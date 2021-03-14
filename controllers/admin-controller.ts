import { User } from '../models/User';
import { Item } from '../models/Item';
import { Transaction } from '../models/Transaction';
import { UserEvent } from '../models/UserEvent';
import { Request, Response } from 'express';


/**
 * Administrative route to drop all the tables
 * For testing purposes only, clears the database after running
 * the shopping simulation
 * @param req - Express request object
 * @param res - Express response object
 */
export const dropAllCollections = async (req: Request, res: Response) => {
    // Drop all collections
    await User.collection.drop();
    await Item.collection.drop();
    await Transaction.collection.drop();
    await UserEvent.collection.drop();
    
    return res.status(200).json({ success: true });
}