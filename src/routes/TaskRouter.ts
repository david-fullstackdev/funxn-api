/// <reference path="../../_all.d.ts" />


import { Router, Request, Response } from 'express';
import TaskController from "../controllers/TaskController";
import Task from '../models/Task';

/**
 * Task Routes
 */
var router = Router();
var passport = require("passport");
/**
 * Get Tasks
 * @param created_at_start {number} - start range for created_at
 * @param created_at_end {number} - end range for created_at
 * @param updated_at_start {number} - start range for updated_at
 * @param updated_at_end {number} - end range for updated_at
 * @return Tasks {array} - list of Tasks 
 */
router.get('/tasks', passport.authenticate('jwt', {session: false}), function (req: Request, res: Response): void {
    // function resHandler(tasks: Array<Task>)     {
    function resHandler(response) {
        res.charset = "utf-8"
        // console.log("/tasks response:", response);
        var formattedResponse = {
            data: response,
            pagination: response.pagination
        }
        res.json(formattedResponse);
    }
    function errorHandler(error: Object) {
        console.error("error:", error);
    }

    // add filters
    // let filters = {};
    let filters = req.query;
    // console.log("req.query:", req.query);
    // filters['pageLimit'] = Number(req.query.limit);
    // filters['pageOffset'] = Number(req.query.offset);
    // filters['createdAtStart'] = req.query.created_at_start;
    // filters['createdAtEnd'] = req.query.created_at_end;
    // filters['modifiedAtStart'] = req.query.modified_at_start;
    // filters['modifiedAtEnd'] = req.query.modified_at_end
    TaskController.fetchAll(filters,resHandler, errorHandler);
});

/*
 * Get by id
 * @param id {string} - id for the item to fetch
 * @return Tasks {array} - list of Tasks 
 */
router.get('/tasks/:id', passport.authenticate('jwt', {session: false}), function (req: Request, res: Response): void {
    function resHandler(tasks: Array<Task>) {
        res.charset = "utf-8"
        res.json(tasks);
    }
    function errorHandler(error: Object) {
        console.error("error:", error);
    }
    TaskController.fetchOne(req.params.id, resHandler, errorHandler);
});

/*
 * Get tasks completed percentage per day
 * @return Tasks {array} - list of Tasks 
 */
router.get('/tasks/completed/percentage', passport.authenticate('jwt', {session: false}), function (req: Request, res: Response): void {
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
    TaskController.fetchCompletedTaskPercentage(filters, patients, resHandler, errorHandler);
});

/*
 * Get tasks completed percentage per day
 * @return Tasks {array} - list of Tasks 
 */
router.get('/tasks/incomplete/percentage', passport.authenticate('jwt', {session: false}), function (req: Request, res: Response): void {
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
    TaskController.fetchIncompleteTaskPercentage(filters, patients, resHandler, errorHandler);
});

router.delete('/tasks/:id', passport.authenticate('jwt', {session: false}), function (req: Request, res: Response): void {
    function resHandler(tasks: Array<Task>) {
        res.charset = "utf-8"
        res.json(tasks);
    }
    function errorHandler(error: Object) {
        console.error("error:", error);
    }
    TaskController.destroy(req.params.id, resHandler, errorHandler);
})

export default router;
