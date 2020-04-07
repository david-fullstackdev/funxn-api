/// <reference path="../../_all.d.ts" />

import { Request, Response} from 'express';
import BaseBookshelfModel from '../models/BaseBookshelfModel';
import User from '../models/User';


/**
 * @class Report
 * @extends {BaseBookshelfModel}
 */
export default class Report extends BaseBookshelfModel {

    public get tableName(): string { return 'report'; };

    owner() {
        return this.belongsTo(User,'owner_id');
    }

    public id: number;
    public title: string;
    public description: string;
    public params: string;  //text


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

    /**
     * Destroy item
     * 
     * @static
     * @param {number} id
     * @returns {empty object}
     */
    public static destroy(id:number) {
        return new Report({'id':id})
        .destroy();
    }
}
