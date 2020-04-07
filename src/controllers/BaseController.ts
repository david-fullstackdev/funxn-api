/// <reference path="../../_all.d.ts" />

import {Request, Response} from 'express';
import *  as uuid from 'node-uuid';

/**
 * Class for setting up base controller that all other controllers will extend.
 */  
export default class BaseController {

    /**
     * Override "model" param in child class
     */ 
    static model;
    static pageLimitDefault:number; 
    static validFilters:string[];


   /**
     * Fetch all
     * @param filters {object} - object of filters for fetch query
     * @param withRelated {array} - list of object names to include in the results
     * @param next {any}
     * @param error {any}
     */
    public static fetchAll(filters, withRelated, next, error): void {
        var validFilters = this.validFilters;
        // setup pagination and filtering 
        this.model
        .query(function(qb) {
            // qb.debug(true);

            for (let k in filters) {
                // ignore if key is for pagination, this is handled in fetchPage
                // TODO: set validFilters at the child class level include here
                if ((k !== 'limit') && (k !== 'offset') && (validFilters.indexOf(k) > -1)) {
                    let v = filters[k];

                    // convert to an array if possible
                    if (typeof(v) === 'string') {
                        v = (v.indexOf(',') > -1) ? v.split(',') : v;
                    }

                    // if value is an array setup between where clause
                    if ((typeof(v) === 'object') && (v.length > 1)) {
                        qb['whereBetween'](k, v);
                    }
                    else {
                        qb['where'](k, v);
                    }
                }
                if (k == 'orderby') {
                    let v = filters[k];
                    let orderDirection = 'asc';
                    if (v.indexOf('-') == 0) {
                        orderDirection = 'desc';
                        v = v.substring(1);
                    }
                    qb['orderBy'](v, orderDirection);
                }
            }

        })
        .fetchPage({
            limit: Number(filters.limit),
            offset: Number(filters.offset),
            withRelated: withRelated
        })
        .then(next)
        .catch(error).bind(this);
    }

    /**
     * 
     * Fetch One 
     * 
     * @static
     * @param {number} id
     */
    public static fetchOne(id,next, error): void {
        this.model
        .fetchOne(id)
        .then(next)
        .catch(error);
    }

    /**
     * Destroy by id
     * 
     * @static
     * @param {number} id
     */
    public static destroy(id, next, error):void {
        this.model
        .destroy(id)
        .then(next)
        .catch(error);
    }

}