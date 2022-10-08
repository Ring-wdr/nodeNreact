import crypto from "crypto";
const KEY = Buffer.from("RingDEcoding!@#$".repeat(2));
const ALGORITHM = "aes-256-cbc"; // 원하는 알고리즘을 입력하세요.
const DIGEST = "base64"; // hex로 해도 무관합니다.

export class MyCipher {
  constructor(iv) {
    if (!iv) this.iv = crypto.randomBytes(16);
    else this.iv = iv;
  }
  encrypt(data) {
    const cipher = crypto.createCipheriv(ALGORITHM, KEY, this.iv);
    const encUpdateBuffer = cipher.update(data);
    return Buffer.concat([encUpdateBuffer, this.iv]).toString(DIGEST);
  }
  decrypt(encryptedData) {
    const decipher = crypto.createDecipheriv(ALGORITHM, KEY, this.iv);
    const decUpdateBuffer = decipher.update(encryptedData, DIGEST);
    return Buffer.concat([decUpdateBuffer, decipher.final()]).toString();
  }
}
