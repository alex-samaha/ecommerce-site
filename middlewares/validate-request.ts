import { Request, Response, NextFunction } from 'express';
import { User } from '../models/User';

// Update the Express Request object to add the sessionId for easy access
// After validating it through the middleware
declare global {
    namespace Express {
        interface Request {
            sessionId?: string
        }
    }
}

/**
 * Middleware to validate a user has a session
 * @param req - Express request object
 * @param res - Express Response object
 * @param next - Express NextFunction object
 * @returns - Unauthorized error if no sessionId on the request, or sets the session ID on the request and continues
 */
export const validateRequest = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    // Using a sessionId in the auth header to simulate a user's session
    const sessionId = req.headers['authorization'];

    if(!sessionId) {
        return res.status(401).json({ error: 'Not authorized' });
    }

    // Make sure the user exists
    const user = await User.findOne({ sessionId });
    if(!user) {
        return res.status(400).json({ error: 'Invalid session token' });
    }

    req.sessionId = sessionId;
    next();
}