/// <reference path="../../_all.d.ts" />

import {Router, Request, Response} from 'express';
import Message from "../models/Message";
// import UserController from "../controllers/UserController";

var router = Router();

/**
 * Get messages
 * @return messages {array} - list of messages 
 */  
router.get("/messages", function (req:Request,res:Response):void {
    // let messages = MessageController.getMessages(res);
    let messages:Array<Message> = Message.getAll();
    res.charset = "utf-8"
    res.json(messages);
});

export default router;
