/// <reference path="../../_all.d.ts" />


import { Router, Request, Response } from 'express';
import ReportController from "../controllers/ReportController";
import Report from '../models/Report';

/**
 * Report Routes
 */
var router = Router();

/**
 * Get Report
 * @param created_at {array} - [start,end] range
 * @return Reports {array} - list of Reports 
 */
router.get('/reports', function (req: Request, res: Response): void {
    // function resHandler(tasks: Array<Task>)     {
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

    // add filters
    let filters = req.query;
    ReportController.fetchAll(filters,resHandler, errorHandler);
});
;

router.get('/reports/custom', function (req: Request, res: Response): void {
    function resHandler(report: Report) {
        res.charset = "utf-8"
        res.json(report);
    }
    function errorHandler(error: Object) {
        console.error("error:", error);
    }
    let filters = req.query;
    ReportController.custom(filters, resHandler, errorHandler);
})



/*
 * Get by id
 * @param id {string} - id for the item to fetch
 * @return Tasks {array} - list of Tasks 
 */
router.get('/reports/:id', function (req: Request, res: Response): void {
    function resHandler(reports: Array<Report>) {
        res.charset = "utf-8"
        res.json(reports);
    }
    function errorHandler(error: Object) {
        console.error("error:", error);
    }
    ReportController.fetchOne(req.params.id, resHandler, errorHandler);
})

router.delete('/reports/:id', function (req: Request, res: Response): void {
    function resHandler(tasks: Array<Report>) {
        res.charset = "utf-8"
        res.json(tasks);
    }
    function errorHandler(error: Object) {
        console.error("error:", error);
    }
    ReportController.destroy(req.params.id, resHandler, errorHandler);
})

export default router;
