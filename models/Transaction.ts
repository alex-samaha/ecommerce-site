import mongoose from 'mongoose';
import { ItemAttrs as ItemType } from './Item';

// An interface for describing properties required to create a new Transaction
export interface TransactionAttrs {
    email: string;
    cart: ItemType[];
    price: number;
    dateTime: Date;
}

// An interface that describes the properties that a Transaction Model has
interface TransactionModel extends mongoose.Model<TransactionDoc> {
    // function that takes in a TransactionAttrs type object and returns a TransactionDoc
    build(attrs: TransactionAttrs): TransactionDoc;
}

// An interface that describes the properties a Transaction Document has
interface TransactionDoc extends mongoose.Document {
    email: string;
    cart: ItemType[];
    price: number;
    dateTime: Date;
}

// Schema to set the properties for a transaction
const transactionSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    cart: {
        type: Array,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    dateTime: {
        type: Date,
        required: true
    }
});

// Adds the custom function to the transaction model
transactionSchema.statics.build = (attrs: TransactionAttrs) => {
    return new Transaction(attrs);
}

// Create the mongoose Transaction model
const Transaction = mongoose.model<TransactionDoc, TransactionModel>('Transaction', transactionSchema);

export { Transaction };