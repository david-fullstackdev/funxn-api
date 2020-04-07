/// <reference path="../../_all.d.ts" />

import BaseController from './BaseController'
import Mood from '../models/Mood';
import User from '../models/User';

/**
 * @class MoodController
 * @extends {BaseController}
 */
export default class MoodController extends BaseController {

    /**
     * Set the model for this controller. This allows
     * for more generic methods on the controller
     */
    public static model = Mood; 
    public static validFilters: string[] = [
        'created_timestamp',
        'patient_id'
    ];


    /**
     * Fetch all
     * @param filters {object} - object of filters for fetch query
     * @param withRelated {array} - list of object names to include in the results
     * @param next {any}
     * @param error {any}
     */
    public static fetchAll(filters, next, error): void {
        let withRelated:string[] = ['patient'];
        super.fetchAll(filters, withRelated, next, error);
    }

    public static random(min:number, max:number) {
        return Math.floor(Math.random()*(max-min+1)+min);
    }
        
    public static fetchMoodPercentage(filters, patients, next, error): void {
        this.model.fetchReportData(filters, patients).then(next);
    }
}




