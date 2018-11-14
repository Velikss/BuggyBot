const chalk = require("chalk");
const date = require("date-and-time");

class Logger {
    static log(log, type = "log") {
        let now = new Date();
        let timestamp = `[${date.format(now, 'ddd MM DD | hh:mm:ss A')}]:`;

        switch (type) {
            case "log":
            {
                return console.log(`${timestamp} ${chalk.bgYellow(type.toUpperCase())} ${log} `);
            }
            case "error":
            {
                return console.log(`${timestamp} ${chalk.bgRedBright(type.toUpperCase())} ${log} `);
            }
            case "warning":
            {
                return console.log(`${timestamp} ${chalk.bgGreen(type.toUpperCase())} ${log} `);
            }
            case "ready":
            {
                return console.log(`${timestamp} ${chalk.greenBright(type.toUpperCase())} ${log} `);
            }
            case "cmd":
            {
                return console.log(`${timestamp} ${chalk.bgCyan(type.toUpperCase())} ${chalk.italic.gray(log)} `);
            }
            case "dm":
            {
                return console.log(`${timestamp} ${chalk.bgBlueBright(type.toUpperCase())} ${log} `);
            }
     
        }
    }

    static error(log) {
        return this.log(log, "error");
    }

    static warn(log) {
         return this.log(log, "warning");
    }
}

module.exports = Logger;
