import { Request, Response } from 'express';
import { v4 } from 'uuid';
import { User } from '../models/User';

/**
 * Route to sign a user up - requires an email to register
 * @param req - Express request object
 * @param res - Express response object
 * @returns {object} - JSON object containing the users session ID to be used while shopping
 */
 export const signUp = async (req: Request, res: Response) => {
    if(!req.body.email) {
        return res.status(400).json({ error: 'Bad request, missing email for signup '});
    }

    // Check if the user already exists
    const userExists = await User.findOne({ email: req.body.email });
    if(userExists) {
        return res.status(400).json({ error: 'User already exists '});
    }
    
    // Save the user to the DB
    const sessionId = v4();
    const user = User.build({ email: req.body.email })
    await user.save();

    return res.status(200).json({ sessionId });
}

/**
 * Route to simulate a user entering the store to 'sign them in'
 * @param req - Express request object
 * @param res - Express response object
 * @returns {object} - JSON object containing the users session ID to be used while shopping
 */
export const signIn = async (req: Request, res: Response) => {

    if(!req.body.email) {
        return res.status(400).json({ error: 'Bad request, missing email for signin '});
    }

    // Make sure the user exists
    const user = await User.findOne({ email: req.body.email });
    if(!user) {
        return res.status(400).json({ error: 'Bad request, user does not exist' });
    }
    // set the session ID for the user
    const sessionId = v4();
    user.sessionId = sessionId;
    await user.save();

    return res.status(200).json({ sessionId });
}
