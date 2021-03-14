import { Item, ItemAttrs as ItemType } from '../models/Item';


/**
 * Utility function to update the inventory status (quantity) of an item
 * after a user checks it out
 * @param item - The item in the user's cart
 */
export const updateInventory = async (item: ItemType) => {
    // Grab the item in the inventory
    const inventoryItem = await Item.findOne({ id: item.id });

    if(!inventoryItem) {
        return;
    }

    // Update the quantity of that item in the inventory
    inventoryItem.quantity -= item.quantity;
    await inventoryItem.save();
}