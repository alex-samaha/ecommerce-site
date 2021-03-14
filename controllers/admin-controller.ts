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
    try {
        await Item.collection.drop();
        await User.collection.drop();
        await Transaction.collection.drop();
        await UserEvent.collection.drop();
    }
    catch(err) {
        console.log("Error dropping collections: ", err);
        return res.status(500).json({
            error: "Error dropping collections, try going through the user signin --> checkout"
                    + " process and try again after"
            });
    }
    
    return res.status(200).json({ success: true });
}