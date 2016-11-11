import PNotify from 'pnotify';
import 'node_modules/pnotify/dist/pnotify.mobile';
import 'node_modules/pnotify/dist/pnotify.confirm';
import 'node_modules/pnotify/dist/pnotify.buttons';

PNotify.prototype.options.styling = 'bootstrap3';

export default PNotify;
