/// <reference path="../../_all.d.ts" />

import { Request, Response} from 'express';
import BaseBookshelfModel from '../models/BaseBookshelfModel';
import User from '../models/User';
import Bookshelf from '../services/Bookshelf';

/**
 * @class Task
 * @extends {BaseBookshelfModel}
 */
export default class Task extends BaseBookshelfModel {

    public get tableName(): string { return 'task'; };

    patient() {
        return this.belongsTo(User,'patient_id');
    }

    caregiver() {
        return this.belongsTo(User,'caregiver_id');
    }

    // public id: number;
    // public title: string;
    // public points: number;
    // public message_1: string;   //text
    // public message_2: string;   //text
    // public status: number;

    /**
     * Fetch by id
     * @static
     * @param {any} id
     * @returns {collection of users}
     * 
     * @memberOf User
     */
    public static fetchOne(id:number){
        return this.collection()
        .query(function(q){
            q.where('id', '=', id)
        })        
        .fetchOne()
    }

    public static fetchReportData(filter, patients) {
        let now = new Date();
        let year = filter?filter.split('-')[0]:now.getFullYear();
        let month = filter?filter.split('-')[1] * 1:now.getMonth()+1;
        return this.collection()
        .query(function(q){
            if (patients.length > 0) {
                q
                .select(Bookshelf.knex.raw('DAY(`finish_due`) as finish_due'), 
                    Bookshelf.knex.raw('ROUND(SUM(CASE WHEN `finish_due` >= `finish_timestamp` THEN 1 ELSE 0 END) / COUNT(*) * 100.0, 2) correctPercentage'))
                .whereRaw('YEAR(`finish_due`)=?', year)
                .whereRaw('MONTH(`finish_due`)=?', month)
                .whereIn('patient_id', patients)
                .groupByRaw('DATE_FORMAT(`finish_due`,"%Y-%m-%d")');
            } else {
                q
                .select(Bookshelf.knex.raw('DAY(`finish_due`) as finish_due'), 
                    Bookshelf.knex.raw('ROUND(SUM(CASE WHEN `finish_due` >= `finish_timestamp` THEN 1 ELSE 0 END) / COUNT(*) * 100.0, 2) correctPercentage'))
                .whereRaw('YEAR(`finish_due`)=?', year)
                .whereRaw('MONTH(`finish_due`)=?', month)
                .groupByRaw('DATE_FORMAT(`finish_due`,"%Y-%m-%d")');
            }
        })
        .fetch()
    }

    public static fetchIncompleteReportData(filter, patients) {
        let now = new Date();
        let year = filter?filter.split('-')[0]:now.getFullYear();
        let month = filter?filter.split('-')[1] * 1:now.getMonth()+1;
        return this.collection()
        .query(function(q){
            if (patients.length > 0) {
                q
                .select(Bookshelf.knex.raw('DAY(`finish_due`) as finish_due'), 
                    Bookshelf.knex.raw('ROUND(SUM(CASE WHEN `finish_due` < `finish_timestamp` THEN 1 WHEN `finish_timestamp` IS NULL THEN 1 ELSE 0 END) / COUNT(*) * 100.0, 2) correctPercentage'))
                .whereRaw('YEAR(`finish_due`)=?', year)
                .whereRaw('MONTH(`finish_due`)=?', month)
                .whereIn('patient_id', patients)
                .groupByRaw('DATE_FORMAT(`finish_due`,"%Y-%m-%d")');
            } else {
                q
                .select(Bookshelf.knex.raw('DAY(`finish_due`) as finish_due'), 
                    Bookshelf.knex.raw('ROUND(SUM(CASE WHEN `finish_due` < `finish_timestamp` THEN 1 WHEN `finish_timestamp` IS NULL THEN 1 ELSE 0 END) / COUNT(*) * 100.0, 2) correctPercentage'))
                .whereRaw('YEAR(`finish_due`)=?', year)
                .whereRaw('MONTH(`finish_due`)=?', month)
                .groupByRaw('DATE_FORMAT(`finish_due`,"%Y-%m-%d")');
            }
        })
        .fetch()
    }

    /**
     * Destroy item
     * 
     * @static
     * @param {number} id
     * @returns {empty object}
     */
    public static destroy(id:number) {
        return new Task({'id':id})
        .destroy();
    }
}
