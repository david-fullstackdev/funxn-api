/// <reference path="../../_all.d.ts" />

import BaseController from './BaseController'
var packageJson = require('../../package.json');

/**
 * @class ServerInfoController
 * @extends {BaseController}
 */
export default class ServerInfoController extends BaseController {

    /**
     * Get server info
     * @param next {function} - callback function for valid response
     * @param error {function} - callback function for invalid operation
     */
    public static getInfo(next, error): void {
        // TODO: The `status` param below should actually validate services before returning OK
        var serverInfo = {
            name: packageJson.name,
            description: packageJson.description,
            version: packageJson.version,
            status: "OK"
        };
        next(serverInfo);
    }

}