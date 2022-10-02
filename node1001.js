import url from "url";

// WATHWG and searchParams

const sampleUrl = `https://user:pass@sub.example.com:8080/p/a/t/h?query=string#hash`;
// const parsedUrl = url.parse(sampleUrl);
// console.log(parsedUrl); // Url type (urlObject)

// console.log(
//   url.format(sampleUrl, { fragment: false, unicode: true, auth: false })
// );
// console.log(url.format(parsedUrl));

const surl = new URL(sampleUrl); // same as new url.URL(sampleUrl)
console.log(surl, surl instanceof URL); // URL type
// console.log(surl.toString());

console.log("dafsdfasdfs :>> ");

const sp = surl.searchParams;
sp.append("name", "hong");
console.log(sp.get("name"));
sp.append("name", "kime");
console.log(sp.toString());

sp.forEach((value, key) => console.log(key, ":", value));

const str = "AZaz🤣123케익45";
// const buf1 = Buffer.from(str);
const buf1 = Buffer.from(str);
console.log(buf1);
console.log(buf1.toString());
