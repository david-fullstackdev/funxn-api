/// <reference path="../../_all.d.ts" />

import BaseController from './BaseController'
import Report from '../models/Report';
import Task from '../models/Task';


/**
 * @class ReportController
 * @extends {BaseController}
 */
export default class ReportController extends BaseController {

    /**
     * Set the model for this controller. This allows
     * for more generic methods on the controller
     */
    public static model = Report;
    public static validFilters: string[] = [
        'created_at',
        'title',
        'owner_id'
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
        let withRelated:string[] = ['owner'];
        // let withRelated:string[] = [];
        super.fetchAll(filters, withRelated, next, error);
    }

    public static custom(filters, next, error): void {
        console.log("custom!");
        let withRelated: string[] = ['owner'];
        //withRelated: withRelate

        // TODO: replace this
        Task
            .fetchOne(2)
            .then(next)
            .catch(error)
    }


}
