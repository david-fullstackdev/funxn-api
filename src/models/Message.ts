import { Request, Response} from 'express';

export default class Message {

    public id: string
    public message: string;

    constructor(msg = null) {
        if (msg) {
            this.message = msg;
        }
    }

    /**
     * Get all users.
     * @return {array} - list of users 
     */
    public static getAll (): Array<Message> {
        var messages:Array<Message> = [];
        messages.push(new Message('Hello Message!'));
        messages.push(new Message('I like pizza!'));
        return messages;
    }

}
