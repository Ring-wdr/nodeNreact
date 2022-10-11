import { Console } from "console";
import fs from "fs";

const stdout = fs.createWriteStream("./stdout.log");
const stderr = fs.createWriteStream("./stderr.log");
const logger = new Console({ stdout, stderr });
logger.log("log>>", "LOG");
logger.error("error>>", "Err");

// fs.watchFile("./stdout.log", { interval: 500 }, (curr, prev) => {
//   console.log("curr>", curr);
//   console.log("prev>", prev);
// });

// reload module by dynamic import

import { deptCodes as aa } from "./codes.js";
let codes = aa; // cf. let codes = require('./codes');
const printCodes = () => console.log("codes :>> ", codes);
printCodes();
fs.watchFile("./codes.js", { interval: 500 }, async () => {
  codes = (await import(`./codes.js?update=${new Date()}`)).deptCodes;
  printCodes();
});
