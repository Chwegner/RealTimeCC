"use strict";
var main = require('main.ts');
var test = /** @class */ (function () {
    function test() {
        // @ts-ignore
        this.connection = connect();
        this.button = document.getElementById("button");
    }
    test.prototype.vorname = function () {
        alert('Hallo');
    };
    return test;
}());
