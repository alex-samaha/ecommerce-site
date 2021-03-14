import mongoose from 'mongoose';
import { ItemAttrs as ItemType} from './Item';

// An interface for describing properties required to create a new user
interface UserAttrs {
    email: string;
    cart?: ItemType[]
}

export interface UserSession {
    email: string;
    cart: ItemType[];
    sessionId: string;
}

interface UserModel extends mongoose.Model<UserDoc> {
    build(attrs: UserAttrs): UserDoc;
}

interface UserDoc extends mongoose.Document {
    email: string;
    sessionId: string;
    cart: ItemType[];
}

// Schema sets up the properties for a user
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    sessionId: {
        type: String,
        required: false
    },
    cart: {
        type: Array,
        required: false
    }
});

// Adds the custom function to the user model
userSchema.statics.build = (attrs: UserAttrs) => {
    return new User(attrs);
}

// Create the mongoose User model
const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };