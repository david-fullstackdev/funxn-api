/// <reference path="../../_all.d.ts" />

import { Request, Response} from 'express';
import BaseBookshelfModel from '../models/BaseBookshelfModel';

/**
 * @class User
 * @extends {BaseBookshelfModel}
 */
export default class User extends BaseBookshelfModel {

    public get tableName(): string { return 'user'; }
    public id: string;
    public username:string;
    public first_name: string;
    public last_name: string;
    public email: string;
    public password: string;

    /**
     * Creates an instance of User.
     * 
     * @param {any} [obj=null]
     */
    constructor(obj = null) {
        super(obj);
        if (obj) {
            this.username = obj.username;
            this.first_name = obj.first_name;
            this.last_name = obj.last_name;
            this.email = obj.email;
            this.password = obj.password
            if (obj.id) {
                this.id = obj.id;
            }
        }
    }

    /**
     * Get the user's full name. 
     * @returns {string} - first and last name combined 
     */  
    getFullName():string {
        return this.first_name + ' ' + this.last_name;
    }

    /**
     * Get a user by id
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
     * 
     * Fetch users by type
     * 
     * @static
     * @param {number} type
     * 
     * @memberOf User
     */
    public static fetchByType(type:number) {
        return User.collection()
        .query(function(q){
            q
            // .where('id', '<', '20')
            .where('type', '=', type)
        })
        .fetch()
    }

    public static signinUser(email:string) {
        return User.collection()
        .query(function(q){
            q
            .where('email', '=', email)
        })
        .fetchOne()
    }

    /**
     * Destroy user
     * 
     * @static
     * @param {number} id
     * @returns
     * 
     * @memberOf User
     */
    public static destroy(id:number) {
        return new User({'id':id})
        .destroy();
    }
}
