import mongoose from 'mongoose';
import { ItemAttrs as ItemType } from './Item';

export interface TransactionAttrs {
    email: string;
    cart: ItemType[];
    price: number;
    dateTime: Date;
}

interface TransactionModel extends mongoose.Model<TransactionDoc> {
    build(attrs: TransactionAttrs): TransactionDoc;
}

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