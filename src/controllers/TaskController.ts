/// <reference path="../../_all.d.ts" />

import BaseController from './BaseController'
import Task from '../models/Task';

/**
 * @class TaskController
 * @extends {BaseController}
 */
export default class TaskController extends BaseController {

    /**
     * Set the model for this controller. This allows
     * for more generic methods on the controller
     */
    public static model = Task;
    public static validFilters: string[] = [
        'created_timestamp',
        'points',
        'status'
    ];
    public static ASSIGNED: number  = 1;
    public static STARTED: number   = 2;
    public static FINISHED: number  = 3

    /**
     * Fetch all
     * @param filters {object} - object of filters for fetch query
     * @param withRelated {array} - list of object names to include in the results
     * @param next {any}
     * @param error {any}
     */
    public static fetchAll(filters, next, error): void {
        let withRelated:string[] = ['patient','caregiver'];
        super.fetchAll(filters, withRelated, next, error);
    }

    public static random(min:number, max:number) {
        return Math.floor(Math.random()*(max-min+1)+min);
    }

    public static fetchCompletedTaskPercentage(filters, patients, next, error): void {
        this.model.fetchReportData(filters, patients).then(next);
    }

    public static fetchIncompleteTaskPercentage(filters, patients, next, error): void {
        this.model.fetchIncompleteReportData(filters, patients).then(next);
    }
}
