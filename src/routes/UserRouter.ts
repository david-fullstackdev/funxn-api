/// <reference path="../../_all.d.ts" />

import { Router, Request, Response } from 'express';
import UserController from "../controllers/UserController";
import User from '../models/User';
import Config from '../configs/AppConfig';
import crypto = require('crypto');
var jwt = require('jsonwebtoken');
var router = Router();
var passport = require("passport");

/**
 * TODO:
 * 
 * - Refactor Routers. Turn into TS class import
 * - First static routes/index.ts with each route calling init
 * - Then Loop through and init each routes/index.ts
 */

/**
 * Get users
 * @return users {array} - list of users 
 */
router.get('/users', function (req: Request, res: Response): void {

    function resHandler(response) {
        res.charset = "utf-8"
        var formattedResponse = {
            data: response,
            pagination: response.pagination
        }
        res.json(formattedResponse);
    }
    function errorHandler(error: Object) {
        console.error("error:", error);
    }

    let filters = req.query;
    UserController.fetchAll(filters,resHandler, errorHandler);

});

/*
 * Get user by id
 * @param id {string} - id for the item to fetch
 * @return users {array} - list of users 
 */
router.get('/users/:id', function (req: Request, res: Response): void {
    function resHandler(users: Array<User>) {
        res.charset = "utf-8"
        res.json(users);
    }
    function errorHandler(error: Object) {
        console.error("error:", error);
    }
    UserController.fetchOne(req.params.id, resHandler, errorHandler);
});


router.delete('/users/:id', function (req: Request, res: Response): void {
    function resHandler(users: Array<User>) {
        res.charset = "utf-8"
        res.json(users);
    }
    function errorHandler(error: Object) {
        console.error("error:", error);
    }
    UserController.destroy(req.params.id, resHandler, errorHandler);
})

router.get('/patients', passport.authenticate('jwt', {session: false}), function (req: Request, res: Response): void {
    function resHandler(response) {
        res.charset = "utf-8"
        res.json(response);
    }
    function errorHandler(error: Object) {
        console.error("error:", error);
    }
    let filters = req.query.filter;
    UserController.fetchAllPatients(filters, resHandler, errorHandler);
});

router.post('/authenticate', function(req: Request, res: Response): void {
    let email = req.body.email;
    let password = req.body.pwd;
    function resHandler(user) {
        if (user) {
            if (user.get('password').indexOf(':') < 0) return res.json({success: false, message: 'Authentication failed.'});
            var fields:string[] = user.get('password').split(':');
            var salt:Buffer = new Buffer(fields[1], 'base64');
            var hash1:string = fields[2];
            var hash2:Buffer = crypto.pbkdf2Sync(password, salt, 10000, 8, 'sha256');
            var hash2String = hash2.toString('base64');
            // if (hash1 == hash2String) {
                var token = jwt.sign(user, Config.JWT_SECRET, {expiresIn: 10080});
                res.json({success: true, user: {displayName: user.get('first_name') + ' ' + user.get('last_name')}, token: 'JWT ' + token});
            // } else {
            //     res.json({success: false, message: 'Authentication failed.'});
            // }
        } else {
            res.json({success: false, message: 'User does not exist.'});    
        }
        
    }
    function errorHandler(error: Object) {
        res.json({success: false, message: 'Authentication failed.'});
    }
    
    UserController.signinUser(email, resHandler, errorHandler);
});

router.get('/test_auth', passport.authenticate('jwt', {session: false}), function (req: Request, res: Response): void {
    res.send(req['user']);
});

export default router;
