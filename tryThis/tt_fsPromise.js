import { join, basename } from "path";
import { existsSync } from "fs";
import { readFile, writeFile, readdir, mkdir, rm } from "fs/promises";

//folder make
const { pathname: curred } = new URL(".", import.meta.url);
const curr = curred.substring(1, 31);

const kingFld = join(curr, "kings");
const sejongFld = join(kingFld, "sejong");
const kingNameFile = join(kingFld, "kings-names.txt");
const sejongFile = join(sejongFld, "sejong.txt");

try {
  if (!existsSync(sejongFld)) {
    await mkdir(sejongFld, { recursive: true });
  }
  if (!existsSync(kingNameFile)) {
    await writeFile(join(kingFld, "kings-names.txt"), "세종대왕");
  }
  if (!existsSync(sejongFile)) {
    await writeFile(join(sejongFld, "sejong.txt"), "훈민정음");
  }
  //folder tree
  const ls = async (fld, depth = 0) => {
    const bname = basename(fld);
    console.log("  ".repeat(depth), bname);
    const files = await readdir(fld, { withFileTypes: true });
    for (const file of files) {
      if (
        !file.isDirectory() ||
        file.name.startsWith(".") ||
        file.name === "node_modules"
      )
        continue;

      await ls(join(fld, file.name), depth + 1);
    }
  };

  await ls(curr);

  //3. 파일

  [kingNameFile, sejongFile].forEach((f) =>
    readFile(f, "utf8").then((data) => {
      console.log(data);
    })
  );

  await rm(kingFld, { recursive: true, force: true });
  //   readFile(kingNameFile,'utf-8').then(data=>{
  //     console.log(kingNameFile, 'n')
  //   })

  //4. non-block folder tree
  const result = {};
  const printResult = (obj, depth = 0) => {
    for (const k of Object.keys(obj)) {
      console.log("  ".repeat(depth), k);
      printResult(obj[k], depth + 1);
    }
  };
  let pendingCnt = 0;
  const ls2 = (fld, obj) => {
    const bname = basename(fld);
    obj[bname] = {};
    readdir(fld, { withFileTypes: true })
      .then((files) => {
        for (const file of files) {
          const { name: fname } = file;
          if (
            !file.isDirectory() ||
            fname.startsWith(".") ||
            fname === "node_modules"
          )
            continue;
          pendingCnt += 1;
          ls2(fld + "/" + fname, obj[bname]);
        }
      })
      .catch((err) => console.error(err))
      .finally((res) => {
        pendingCnt -= 1;
        // console.log("result>>", result);
        // console.log("pendingCnt :>> ", pendingCnt);
        pendingCnt < 0 && printResult(result);
        // console.log(JSON.stringify(result, null, "  "));
      });
  };
  ls2(curr, result);
} catch (err) {}
