export class logindaten {


    createUsername(vorname, nachname) {
        let part1 = vorname.slice(0, 2);
        let part2 = nachname;

        let complete = part1 + part2;
        let username = complete.toLowerCase();

        return username;
    }

    createPassword() {
        let generatePassword = require('password-generator');

        let maxLength = 8;
        let minLength = 8;
        let uppercaseMinCount = 2;
        let lowercaseMinCount = 2;
        let numberMinCount = 2;

        let UPPERCASE_RE = /([A-Z])/g;
        let LOWERCASE_RE = /([a-z])/g;
        let NUMBER_RE = /([\d])/g;

        function isStrongEnough(password) {
            var uc = password.match(UPPERCASE_RE);
            var lc = password.match(LOWERCASE_RE);
            var n = password.match(NUMBER_RE);

            return password.length >= minLength &&
                uc && uc.length >= uppercaseMinCount &&
                lc && lc.length >= lowercaseMinCount &&
                n && n.length >= numberMinCount;
        };


            let password = "";
            let randomLength = Math.floor(Math.random() * (maxLength - minLength)) + minLength;
            while (!isStrongEnough(password)) {
                password = generatePassword(randomLength, false, /[\w\d\?\-]/);
            }
            return password;


    }

}
