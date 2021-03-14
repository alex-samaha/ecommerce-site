import mongoose from 'mongoose';

export interface ItemAttrs {
    name: string;
    price: number;
    quantity: number;
    id: string;
}

interface ItemModel extends mongoose.Model<ItemDoc> {
    build(attrs: ItemAttrs): ItemDoc;
}

interface ItemDoc extends mongoose.Document {
    name: string;
    price: number;
    quantity: number;
    id: string;
}

// Schema to set the properties for an item
const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    id: {
        type: String,
        required: true
    }
});

// Adds the custom function to the item model
itemSchema.statics.build = (attrs: ItemAttrs) => {
    return new Item(attrs);
}

// Create the mongoose Item model
const Item = mongoose.model<ItemDoc, ItemModel>('Item', itemSchema);

export { Item };