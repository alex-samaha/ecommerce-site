import { ItemAttrs as ItemType } from '../models/Item';
import { User } from '../models/User';


/**
 * Function to take in the new cart and save the contents to the DB
 * and then return the up to date cart back to the user
 * @param sessionId - The user's sessionId
 * @param cart - The user's cart
 * @returns {Promise<ItemType[]>} - The user's updated cart
 */
export const updateCart = async (sessionId: string, cart: ItemType[]): Promise<ItemType[]> => {
    // Update the user's cart
    await User.updateOne(
        { "sessionId": sessionId },
        { "$set": { "cart": cart } }
    );

    // Grab the updated user's cart info
    const updatedUser = await User.findOne({ sessionId });

    // Return the updated cart
    return updatedUser!.cart;
}