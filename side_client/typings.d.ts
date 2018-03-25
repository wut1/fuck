/* SystemJS module definition */
import 'jquery';
// interface JQuery {
//   slimScroll(): any;
// }
declare var module: NodeModule;
// declare var jQuery:JQuery|JQueryStatic;
// declare var $:JQuery|JQueryStatic;
interface NodeModule {
  id: string;
}

declare global {
  interface JQuery {
    slimScroll(arg: any): JQuery;
  }
}


