import { open } from "fs/promises";

const hfile = new URL("test.txt", import.meta.url);
let fh;
try {
  fh = await open(hfile, "a+");
  //   console.log(await fh.stat());
  //   await fh.writeFile("훈민정음");
  const buf = Buffer.from("머앟ㄷㅈㄱㅂㅈ");
  await fh.write(buf, 0, buf.length, 0);
  //   console.log(await fh.readFile({ encoding: "utf8" }));
} catch (error) {
  console.error("err", error);
} finally {
  fh?.close();
}
