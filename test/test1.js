/**
 * Created by pc on 2016/2/29.
 */
var events = require('events');
function Stream() {
    events.EventEmitter.call(this);// events.EventEmitter.call(this)���ñ���
}
util.inherits(Stream, events.EventEmitter);