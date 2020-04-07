/// <reference path="../../_all.d.ts" />

import {Router, Request, Response} from 'express';
import ServerInfoController from '../controllers/ServerInfoController';

var router = Router();

/**
 * Get messages
 * @return messages {array} - list of messages 
 */  
router.get("/server_info", function (req:Request,res:Response):void {
    function resHandler (data:Object) {
        res.charset = "utf-8"
        res.json(data);
    }
    function errorHandler (error:Object) {
        console.error("error:",error);
    }

    ServerInfoController.getInfo(resHandler, errorHandler);
});

export default router;
