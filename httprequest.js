import http from "http";
// import https from 'https';

// http.get("http://localhost/json", (res) => {
//   res.setEncoding("utf8");
//   res.on("data", (chunk) => {
//     console.log("chunk :>> ", chunk);
//   });
//   res.on("end", () => console.log("No more data in response."));
// });
const options1 = {
  hostname: "localhost",
  path: "/json",
  port: 80,
  method: "GET",
};
const req = http.request(options1, (res) => {
  res.on("data", (chunk) => {
    console.log("chunk :>> ", chunk);
  });
  res.on("data");
});

const postData = JSON.stringify({ nm: "강감찬", age: 30 });
const options2 = {
  hostname: "localhost",
  path: "/json",
  port: 80,
  method: "GET",
  path: encodeURI("/json?name=" + "홍길동"),
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    // "Content-Length": Buffer.byteLength(postData), // 생략가능!
  },
};
const req2 = http.request(options2, (res) => {
  res.on("data", (chunk) => {
    console.log("chunk :>> ", chunk);
  });
  res.on("data");
});
//req.write(...);  // b

//req.write(...);  // body to send
req.end();
req2.write(postData);
req2.end();
