
/// <reference path="../../_all.d.ts" />

import * as Knex from 'knex';
import * as _Bookshelf from 'bookshelf';
import Config from '../configs/AppConfig'

/** 
 * Class to setup Bookshelf database connect
 *  - [Class Setup](http://bit.ly/29Knbg8)
 *  - [Migrations](http://bit.ly/29u6GQW)  
 */
export default class Bookshelf {

    public static knex:Knex = Knex({
        client: Config.DB_CLIENT,
        connection: {
            host     : Config.DB_HOST,
            user     : Config.DB_USER,
            password : Config.DB_PWD,
            database : Config.DB_NAME,
            charset  : 'utf8'
        }
    });



    public static bookshelf:_Bookshelf = _Bookshelf(Bookshelf.knex);

    public static connection(): _Bookshelf {
        Bookshelf.bookshelf.plugin('registry');
        Bookshelf.bookshelf.plugin('pagination')
        return Bookshelf.bookshelf;
    }
}
