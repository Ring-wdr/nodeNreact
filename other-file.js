import { MyCipher } from "./utils/cici.js";
const myCipher = new MyCipher();
const data = process.argv[3];

const result =
  process.argv[2] === "-enc"
    ? myCipher.encrypt(data)
    : process.argv[2] === "-dec"
    ? myCipher.decrypt(data)
    : "";
console.log(result);
