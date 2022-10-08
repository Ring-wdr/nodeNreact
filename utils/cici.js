import crypto from "crypto";
const KEY = Buffer.from("RingDEcoding!@#$".repeat(2));
const ALGORITHM = "aes-256-cbc"; // 원하는 알고리즘을 입력하세요.
const DIGEST = "base64"; // hex로 해도 무관합니다.

export class MyCipher {
  constructor() {
    this.iv = crypto.randomBytes(16);
  }
  encrypt(data) {
    const cipher = crypto.createCipheriv(ALGORITHM, KEY, this.iv);
    const encUpdateBuffer = cipher.update(data);
    const encryptData = Buffer.concat([
      encUpdateBuffer,
      cipher.final(),
    ]).toString(DIGEST);
    return `${this.iv.toString("hex")}:${encryptData}`;
  }
  decrypt(encodedData) {
    const [iv, encryptedData] = encodedData.split(":");
    const decipher = crypto.createDecipheriv(
      ALGORITHM,
      KEY,
      Buffer.from(iv, "hex")
    );
    const decUpdateBuffer = decipher.update(encryptedData, DIGEST);
    return Buffer.concat([decUpdateBuffer, decipher.final()]).toString();
  }
}

const argvLen = process.argv?.length;
if (argvLen > 2 && argvLen !== 4) {
  console.log("usage> node mycipher [-e|-enc] data");
  console.log("usage> node mycipher [-d|-dec] encrtyptData");
  process.exit(1);
}
if (argvLen == 4) {
  const flag = process.argv[2];
  const data = process.argv[3];
  const mycipher = new MyCipher();
  flag?.startsWith("-e")
    ? console.log(mycipher.encrypt(data))
    : flag?.startsWith("-d")
    ? console.log(mycipher.decrypt(data))
    : console.log("please follow the rule");
}
