import fs from "fs";

const projectFolder = new URL("./king/sejong/", import.meta.url);

const { mkdir, writeFile, readdir, readFile, rm } = fs.promises;

// const { readdirSync } = fs;
// function recur(dirName, depth = 0, prev = "") {
//   const dirs = readdirSync(prev + dirName + "/", { withFileTypes: true })
//     .filter(
//       (p) => p.isDirectory() && p.name[0] !== "." && p.name !== "node_modules"
//     )
//     .map((dir) => dir.name);
//   for (const dir of dirs) {
//     console.log(depth ? " ".repeat(depth - 1) + "ㄴ " + dir : dir);
//     recur(dir, depth + 1, prev + dirName + "/");
//   }
// }

// Async
// const recur = async (dirName = ".", depth = 0, prev = "") => {
//   dirName !== "." &&
//     console.log(depth > 1 ? " ".repeat(depth - 2) + "ㄴ " + dirName : dirName);
//   const dirs = await readdir(`${prev}${dirName}`, { withFileTypes: true }).then(
//     (res, rej) =>
//       res
//         .filter(
//           (p) =>
//             p.isDirectory() && p.name[0] !== "." && p.name !== "node_modules"
//         )
//         .map((dir) => dir.name)
//   );
//   for (const dir of dirs) {
//     await recur(dir, depth + 1, prev + dirName+'/');
//   }
// };

// then

const closureRecur = (() => {
  const obj = {};
  let numOfElements = 0;
  let state = 0;
  let timer = setInterval(() => {
    if (state < numOfElements) {
      state = numOfElements;
    } else if (state === numOfElements) {
      console.log(JSON.stringify(obj, null, "  "));
      clearInterval(timer);
    }
  }, 100);
  const recur = (dirName = ".", depth = 0, prev = "", arr = ["root"]) => {
    if (depth === 0) {
      numOfElements = 0;
      state = 0;
      for (const key of Object.keys(obj)) {
        delete obj[key];
      }
    }
    readdir(prev + dirName, { withFileTypes: true })
      .then((res, rej) =>
        res
          .filter((p) =>
            !p.isDirectory() || p.name[0] === "." || p.name === "node_modules"
              ? false
              : true
          )
          .map((dir) => dir.name)
      )
      .then((res, rej) => {
        if (res.length === 0) {
          let node = obj;
          arr.forEach((ele) => {
            numOfElements += 1;
            if (!node[ele]) node[ele] = {};
            node = node[ele];
          });
        }
        for (const dir of res) {
          recur(dir, depth + 1, prev + dirName + "/", [...arr, dir]);
        }
      });
  };
  return recur;
})();

try {
  await mkdir(projectFolder, { recursive: true });
  // await mkdir(new URL("./king/sejong/nam", import.meta.url), {
  //   recursive: true,
  // });
  // await mkdir(new URL("./king/sejong/nam/js", import.meta.url), {
  //   recursive: true,
  // });
  // await mkdir(new URL("./king/sejong/nam/ts", import.meta.url), {
  //   recursive: true,
  // });
  // await mkdir(new URL("./king/taejong/", import.meta.url), { recursive: true });
  // await mkdir(new URL("./king/taejong/adul", import.meta.url), {
  //   recursive: true,
  // });
  await writeFile("./king/king_names.txt", "세종대왕");
  await writeFile("./king/sejong/sejong.txt", "훈민정음");

  // console.log("file list>>>");
  closureRecur();

  readFile("./king/king_names.txt")
    .then((res, rej) => {
      if (rej) throw rej;
      // console.log(res.toString("utf8"));
      return readFile("./king/sejong/sejong.txt");
    })
    .then((res, rej) => {
      if (rej) throw rej;
      // console.log(res.toString("utf8"));
      return rm("./king", { recursive: true, force: true });
    })
    .finally(async (res, rej) => {
      console.log("file list>>>");
      // closureRecur();
    });
} catch (err) {
  console.error(err);
}
