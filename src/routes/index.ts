/// <reference path="../../_all.d.ts" />

import ServerInfoRouter from './ServerInfoRouter';
import MessageRouter from './MessageRouter';
import UserRouter from './UserRouter';
import TaskRouter from './TaskRouter';
import MoodRouter from './MoodRouter';
import ReportRouter from './ReportRouter';

// TODO: Make this whole thing dynamic. Just include each file
export default class Routes {
    public static init(app,path): void {
      app.use(path, ServerInfoRouter);
      app.use(path, UserRouter);
      app.use(path, MessageRouter);
      app.use(path, TaskRouter);
      app.use(path, MoodRouter);
      app.use(path, ReportRouter)
    }
}
