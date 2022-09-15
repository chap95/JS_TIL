const logger = require("./module");
const logger2 = require("./module2");
const person = require("./module3");
const person2 = require("./module4");

console.log("logger => ", logger);
logger("message");
logger.info("info");

console.log("logger2 => ", logger2);
logger2.info("logger2");
logger2.logger("logger2");

console.log("person => ", person);
console.log("person2 => ", person2);
