import util from "util";
import crypto from "crypto";

const data = "1234";
const salt = crypto.randomBytes(64).toString("base64");

// crypto.pbkdf2(data, salt, 100000, 128, "sha512", (err, derivedKey) => {
//   if (err) throw err;
//   console.log("dk1>>", derivedKey.toString("base64")); // length: 256
// });

/// without promisify해서 derivedKey.toString("base64")를 await로...
const pb = util.promisify(crypto.pbkdf2);
console.time("dd");
const pdata = await pb(data, salt, 10000, 128, "sha512");
console.log("[[[>>>", pdata.toString("base64"));
console.timeEnd("dd");
console.time("dda");

const dk2 = crypto.pbkdf2Sync(data, salt, 100000, 128, "sha512");
console.log("dk2>>", dk2.toString("base64"));
console.timeEnd("dda");
