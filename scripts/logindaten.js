"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var logindaten = /** @class */ (function () {
    function logindaten() {
    }
    logindaten.prototype.createUsername = function (vorname, nachname) {
        var part1 = vorname.slice(0, 2);
        var part2 = nachname;
        var complete = part1 + part2;
        var username = complete.toLowerCase();
        return username;
    };
    logindaten.prototype.createPassword = function () {
        var generatePassword = require('password-generator');
        var maxLength = 8;
        var minLength = 8;
        var uppercaseMinCount = 2;
        var lowercaseMinCount = 2;
        var numberMinCount = 2;
        var UPPERCASE_RE = /([A-Z])/g;
        var LOWERCASE_RE = /([a-z])/g;
        var NUMBER_RE = /([\d])/g;
        function isStrongEnough(password) {
            var uc = password.match(UPPERCASE_RE);
            var lc = password.match(LOWERCASE_RE);
            var n = password.match(NUMBER_RE);
            return password.length >= minLength &&
                uc && uc.length >= uppercaseMinCount &&
                lc && lc.length >= lowercaseMinCount &&
                n && n.length >= numberMinCount;
        }
        ;
        var password = "";
        var randomLength = Math.floor(Math.random() * (maxLength - minLength)) + minLength;
        while (!isStrongEnough(password)) {
            password = generatePassword(randomLength, false, /[\w\d\?\-]/);
        }
        return password;
    };
    return logindaten;
}());
exports.logindaten = logindaten;
