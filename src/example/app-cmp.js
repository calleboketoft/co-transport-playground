"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var socket_io_service_1 = require('../services/socket-io-service');
var Rx_1 = require('rxjs/Rx');
var AppCmp = (function () {
    function AppCmp() {
        this.startInterval$ = new core_1.EventEmitter();
        this.stopInterval$ = new core_1.EventEmitter();
        this.counter = 0;
        socket_io_service_1.socket.on('new message', function (msg) {
            console.log('message: ' + msg);
        });
        var interval$ = Rx_1.Observable.interval(1000);
        var intervalThatStops$ = interval$
            .takeUntil(this.stopInterval$);
        this.startInterval$
            .switchMapTo(intervalThatStops$)
            .do(function (x) {
            socket_io_service_1.socket.emit('new message ', 'auto ' + x);
        })
            .subscribe(function (x) { return console.log(x); });
    }
    AppCmp.prototype.sendMessage = function (messageText) {
        socket_io_service_1.socket.emit('new message', 'manual ' + this.counter);
        this.counter++;
    };
    AppCmp = __decorate([
        core_1.Component({
            selector: 'app',
            template: "\n    <div class='container'>\n      <h1>Socket.io test</h1>\n      <button type='btn btn-primary'\n        (click)='sendMessage(\"manual click message\" + counter)'>\n        Send one manual message\n      </button>\n      <button type='btn btn-primary'\n        (click)='startInterval$.emit()'>\n        Start interval\n      </button>\n      <button type='btn btn-primary'\n        (click)='stopInterval$.emit()'>\n        Stop interval\n      </button>\n    </div>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], AppCmp);
    return AppCmp;
}());
exports.AppCmp = AppCmp;
//# sourceMappingURL=app-cmp.js.map