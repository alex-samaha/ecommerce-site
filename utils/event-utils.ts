import { UserEvent, UserEventAttrs as UserEventType } from '../models/UserEvent';

/**
 * Takes in the user event information, and stores the event to the database
 * @param eventInfo - Information on the user's event that just ocurred
 */
export const saveUserEvent = async (eventInfo: UserEventType) => {
    const event = UserEvent.build(eventInfo);
    await event.save();
}