export class LogUtils {
    static info(message) {
        console.info(`\x1b[36m${message}\x1b[0m`);
    }
    static warn(message) {
        console.warn(`\x1b[33m${message}\x1b[0m`);
    }
    static error(message) {
        console.error(`\x1b[31m${message}\x1b[0m`);
    }
    static success(message) {
        console.log(`\x1b[32m${message}\x1b[0m`);
    }
    static log(message) {
        console.log(message);
    }
    static startPrintingGray() {
        return '\x1b[90m';
    }
    static endPrintingGray() {
        return '\x1b[0m';
    }
}
//# sourceMappingURL=logUtils.js.map