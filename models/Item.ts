import mongoose from 'mongoose';

// An interface for describing properties required to create a new item
export interface ItemAttrs {
    name: string;
    price: number;
    quantity: number;
    id: string;
}

// An interface that describes the properties that an Item Model has
interface ItemModel extends mongoose.Model<ItemDoc> {
    // function that takes in a ItemAttrs type object and returns an ItemDoc
    build(attrs: ItemAttrs): ItemDoc;
}

// An interface that describes the properties an Item Document has
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