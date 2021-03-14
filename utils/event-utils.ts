import { UserEvent, UserEventAttrs as UserEventType } from '../models/UserEvent';

export const saveUserEvent = async (eventInfo: UserEventType) => {
    const event = UserEvent.build(eventInfo);
    await event.save();
}