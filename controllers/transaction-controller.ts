import { Request, Response } from 'express';
import { User } from "../models/User";

/**
 * Route to simulate a user leaving the store to 'sign them out' or 'check out'
 * @param req - Express request object
 * @param res - Express response object
 * @returns {object} - JSON object if the request was successful
 */
 export const checkout = async (req: Request, res: Response) => {

    // Get the user
    const user = await User.findOne({ sessionId: req.user.sessionId });

    //@TODO: Add logic to checkout the user
    // Update the items in the database that were purchased to reduce their quantity
    // Empty the customer's cart
    

    // At this point we know we have a valid user with the middleware
    // Destroy the session and save to the DB
    user!.sessionId = '';
    await user!.save();

    return res.status(200).json({ sucess: true });
}