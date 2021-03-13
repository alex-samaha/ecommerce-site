import mongoose from 'mongoose';
import { ItemAttrs as Item} from './Item';

// An interface for describing properties required to create a new user
interface UserAttrs {
    email: string;
    cart?: Item[]
}

// An interface that describes the properties that a User Model has
interface UserModel extends mongoose.Model<UserDoc> {
    // function that takes in a UserAttrs type object and returns UserDoc
    build(attrs: UserAttrs): UserDoc;
}

// An interface that describes the properties a User Document has
interface UserDoc extends mongoose.Document {
    email: string;
    sessionId: string;
    cart: Item[];
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
    cart: []
});

// Adds the custom function to the user model
userSchema.statics.build = (attrs: UserAttrs) => {
    return new User(attrs);
}

// Create the mongoose User model
const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };