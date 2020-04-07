/// <reference path="../../_all.d.ts" />

import { Request, Response} from 'express';
import BaseBookshelfModel from '../models/BaseBookshelfModel';
import User from '../models/User';
import Bookshelf from '../services/Bookshelf';

/**
 * @class Task
 * @extends {BaseBookshelfModel}
 */
export default class Mood extends BaseBookshelfModel {

    // public patient_id: number;
    public mood: string;
    public created_timestamp: Date;


    public get tableName(): string { return 'mood_history'; };

    patient() {
        return this.belongsTo(User,'patient_id');
    }

    public static fetchReportData(filter, patients) {
        let year = filter.split('-')[0];
        let month = filter.split('-')[1] * 1;
        return this.collection()
        .query(function(q){
            if (patients.length > 0) {
                q
                .select(Bookshelf.knex.raw('DAY(`created_timestamp`) as date'))
                .avg('mood_number as value')
                .whereRaw('YEAR(`created_timestamp`)=?', year)
                .whereRaw('MONTH(`created_timestamp`)=?', month)
                .whereIn('patient_id', patients)
                .groupByRaw('DATE_FORMAT(`created_timestamp`,"%Y-%m-%d")');    
            } else {
                q
                .select(Bookshelf.knex.raw('DAY(`created_timestamp`) as date'))
                .avg('mood_number as value')
                .whereRaw('YEAR(`created_timestamp`)=?', year)
                .whereRaw('MONTH(`created_timestamp`)=?', month)
                .groupByRaw('DATE_FORMAT(`created_timestamp`,"%Y-%m-%d")');
            }
        })
        .fetch()
    }
    // /**
    //  * Fetch by id
    //  * @static
    //  * @param {any} id
    //  * @returns {collection of users}
    //  * 
    //  * @memberOf User
    //  */
    // public static fetchOne(id:number){
    //     return this.collection()
    //     .query(function(q){
    //         q.where('id', '=', id)
    //     })        
    //     .fetchOne()
    // }

    /**
     * Destroy item
     * 
     * @static
     * @param {number} id
     * @returns {empty object}
     */
    // public static destroy(id:number) {
    //     return new Mood({'id':id})
    //     .destroy();
    // }
}
