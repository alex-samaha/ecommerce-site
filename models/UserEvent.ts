import mongoose from 'mongoose';
import { UserAction } from './Constants';

export interface UserEventAttrs {
    email: string;
    eventType: UserAction;
    eventDescription: string;
    dateTime: Date;
}

interface UserEventModel extends mongoose.Model<UserEventDoc> {
    build(attrs: UserEventAttrs): UserEventDoc;
}

interface UserEventDoc extends mongoose.Document {
    email: string;
    eventType: UserAction;
    eventDescription: string;
    dateTime: Date;
}

// Schema to set the properties for a UserEvent
const UserEventSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    eventType: {
        type: UserAction,
        required: true
    },
    eventDescription: {
        type: String,
        required: true
    },
    dateTime: {
        type: Date,
        required: true
    }
});

// Adds the custom function to the UserEvent model
UserEventSchema.statics.build = (attrs: UserEventAttrs) => {
    return new UserEvent(attrs);
}

// Create the mongoose UserEvent model
const UserEvent = mongoose.model<UserEventDoc, UserEventModel>('UserEvent', UserEventSchema);

export { UserEvent };