import path, { dirname, sep } from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
export { __filename, __dirname };

// console.log(__dirname);
// console.log(__filename);
// console.log(sep);
// console.log(global); // 글로벌 객체
// console.log(path.delimiter); // mac : / window ;
const filePath = "C:/Users/enne123/fpp/nodeBasic";
console.log(path.isAbsolute(filePath)); //절대 경로인지 boolean
console.log(
  path.format({
    root: "C:/",
    dir: "C:/Users/enne123/fpp",
    base: "nodeBasic",
    ext: "",
    name: "nodeBasic",
  })
);
/*
console.log(path.parse(filePath));
import os from "os";
console.log(os.cpus());
console.log(os.totalmem());
// const ;
// console.log(process.env);
process.on("exit", (...args) => {
  console.log(args);
});

// setTimeout(console.log, 4000, "dd");
import fs from "fs";
fs.readFile("./xxx.txt", (err, data) => {
  consodle.log(data);
});

process.on("uncaughtException", (err) => {
  console.error(err);
  process.exit(1);
});
*/
console.log(process);
setTimeout(console.log, 2000, "apple");
