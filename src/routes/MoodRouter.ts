/// <reference path="../../_all.d.ts" />

import { Router, Request, Response } from 'express';
import MoodController from "../controllers/MoodController";
import Mood from '../models/Mood';

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
 * Get moods
 * @return users {array} - list of users 
 */
router.get('/moods', passport.authenticate('jwt', {session: false}), function (req: Request, res: Response): void {

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
    MoodController.fetchAll(filters,resHandler, errorHandler);

});
/*
 * Get moods percentage per day
 */
router.get('/moods/completed/percentage', passport.authenticate('jwt', {session: false}), function (req: Request, res: Response): void {
    function resHandler(response) {
        res.charset = "utf-8"
        res.json(response);
    }
    function errorHandler(error: Object) {
        console.error("error:", error);
    }
    let filters = req.query.filter;
    let patients = req.query.patients;
    if (patients) {
        patients = patients.split(',');
        patients = patients.map(function(id) { return parseInt(id); });
    } else {
        patients = [];
    }
    MoodController.fetchMoodPercentage(filters, patients, resHandler, errorHandler);
});

export default router;
