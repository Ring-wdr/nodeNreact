// import { readFile, readFileSync } from "fs";
import fs from "fs/promises";
// import { readFile, promises } from "fs";
// const hfile = new URL("./package.json", import.meta.url);
/*
 * 비추천
// import path from "path";
// const hfile = path.json(__dirname, 'package.json')
*/
// readFile(hfile, "utf-8", (err, data) => {
//   if (err) throw err;
//   //   console.log("buff>>", data, data.length, data.byteLength);
//   console.log("data>>", data.toString(), data instanceof Buffer);
// });

// import { promisify } from "util";
// // const data = await promisify(readFile)("./package.json");
// const data = await new Promise((res, rej) => {
//   readFile("./package.json", "utf-8", (err, data) => {
//     if (err) rej(err);
//     res(data);
//   });
// });
// console.log(";;>>", data.toString("utf8"));

// 비추천
// const data2 = readFileSync("./package.json");
// console.log(";;>>", data2.toString("utf8"));

const hfile = new URL("./test.txt", import.meta.url);
const usePromise = true;

// import { readFile, readFileSync } from "fs";

if (usePromise) {
  const { readFile, rm, mkdir, rmdir } = fs;
  //   const { readFile } = fs;
  //   const data = await readFile(hfile, {
  //     encoding: "utf8",
  //     flag: "wx+",
  //   });
  //   console.log("data>>", data);

  //   const projectFolder = new URL("./test/project/", import.meta.url);
  //   const createDir = await mkdir(projectFolder, { recursive: true });

  //   rm(new URL("./test", import.meta.url), { recursive: true, force: true });
  //   rm("./test", { recursive: true, force: true }); // rmdir's recursive is deprecated!!

  //   const files = await readdir(".", { withFileTypes: true });
  //   for (const file of files) console.log("f=", file.name, file.isDirectory());

  //   const sss = await readlink("./sss");// link 설정값 보기
  //   console.log("sss>>", sss);
  //   const linkFile = new URL("./lntest", import.meta.url);
  //   console.log("ln<<", await readFile(linkFile, "utf8"));
} else {
  //   readFile(hfile, "utf-8", (err, data) => {
  //     if (err) throw err;
  //     console.log("data>>", data);
  //   });
}
