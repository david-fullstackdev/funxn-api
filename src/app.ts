/// <reference path="../_all.d.ts" />
"use strict";
// import {Router, Request, Response} from 'express';
import * as express from "express";
import * as path from "path";
import * as bodyParser from 'body-parser';
import Config from './configs/AppConfig';
import Routes from './routes';
import User from './models/User';
var passport = require("passport");
var cors = require('cors');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;

class App {
    public app: express.Application;
    /**
     * App constructor
     */  
    constructor() {
        // TODO: Bootstrap the app configuration
        console.dir("Starting App");
        let userModel = User;
        // Setup server
        this.app = express();
        this.app.listen(Config.PORT, '0.0.0.0', function (e) {
            if (e) {
                console.dir("App constructor error:", e);
                return;
            }
            console.dir("App listening on http://localhost:" + Config.PORT);
        });
        
        // Configure app to use bodyParser()
        // this will let us get the data from a POST
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());
        this.app.use(cors());
        this.app.use(passport.initialize());

        let opts = {
            jwtFromRequest: ExtractJwt.fromAuthHeader(),
            secretOrKey: Config.JWT_SECRET
        };
        passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
            userModel.fetchOne(jwt_payload.id).then(function(user) {
                if (user) {
                    done(null, user);
                } else {
                    done(null, false);
                }                
            }).catch(function(err) {
                done(err, false);
            })
        }));

        // Configure routes
        // NOTE: The individual routes are defined in the `/routes/` directory
        Routes.init(this.app, Config.API_ROOT);
    }

    /**
     * Start server
     */  
    public static start(): App {
        return new App();
    }

}
var server = App.start();