/// <reference path="../../_all.d.ts" />

/**
 *  Reference: 
 *  - [Class Setup](http://bit.ly/29Knbg8)
 *  - [Migrations](http://bit.ly/29u6GQW)
 */
import * as Knex from 'knex';
import * as Bookshelf from 'bookshelf';
import Config from '../configs/AppConfig';

export default class Database {

    public static knex:Knex = Knex({
        client: 'mysql',
        connection: {
            host     : Config.DB_HOST,
            user     : Config.DB_USER,
            password : Config.DB_PWD,
            database : Config.DB_NAME,
            charset  : 'utf8'
        }
    });

    public static bookshelf:Bookshelf = Bookshelf(Database.knex);

    public static connection(): Bookshelf {
        Database.bookshelf.plugin('registry');
        Database.bookshelf.plugin('pagination')
        return Database.bookshelf;
    }
}
