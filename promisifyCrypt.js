import crypto from "crypto";

const data = "1234";
const salt = crypto.randomBytes(64).toString("base64");

const encryptPassword = (data) =>
  new Promise((res, rej) => {
    crypto.pbkdf2(data, salt, 16384, 128, "sha512", (err, derivedKey) => {
      if (err) rej(err);
      res(derivedKey.toString("base64"));
    });
  });

console.time("PBKDF2");
console.log(await encryptPassword(data)); // 16384
console.timeEnd("PBKDF2");

console.time("SCRYPT");
console.log(
  crypto.scryptSync(data, salt, 128, { N: 16384 }).toString("base64")
);
console.timeEnd("SCRYPT");
