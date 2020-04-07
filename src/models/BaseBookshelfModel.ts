/// <reference path="../../_all.d.ts" />
import { Request, Response} from 'express';
import Bookshelf from '../services/Bookshelf';

export default class BaseBookshelfModel extends Bookshelf.connection().Model<BaseBookshelfModel> {

    public get tableName(): string { return undefined; }

    constructor(obj = null) {
        super(obj);
    }


    /**
     * Get the user's full name. 
     * @return {string} - first and last name combined 
     */  
    public doTest():string {
        return 'doTest!';
    }
}
