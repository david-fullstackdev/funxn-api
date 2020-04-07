/// <reference path="../../_all.d.ts" />

import BaseController from './BaseController'
import User from '../models/User';

/**
 * @class UserController
 * @extends {BaseController}
 */
export default class UserController extends BaseController {

    /**
     * Set the model for this controller. This allows
     * for more generic methods on the controller
     */
    public static model = User; 
    public static validFilters: string[] = [
        'created_timestamp',
        'email',
        'username',
        'type',
        'device_token',
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
        let withRelated:string[] = [];
        super.fetchAll(filters, withRelated, next, error);
    }

    public static fetchAllPatients(filters, next, err): void {
        this.model.fetchByType(2).then(next);
    }

    public static signinUser(email, next, err): void {
        this.model.signinUser(email).then(next);
    }
}




