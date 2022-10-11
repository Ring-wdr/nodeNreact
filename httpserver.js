import { createServer } from "http";
import { createReadStream, readFile } from "fs";

const server = createServer((req, res) => {
  //   console.log(req.url, req.headers.host);
  const { searchParams: param, pathname } = new URL(
    req.url || "",
    `http://${req.headers.host}`
  );
  console.log(param, pathname);

  const router = () => ({
    ["/"](body) {
      res.writeHead(200, { "Content-type": "text/html; charset=utf-8" });
      res.write("<h1>WRITE</h1>");
      res.write(`
          <h3> My name is ${param.get("name")}</h3>
          <h3> Your name is ${body.get("nm")} ${body.get("age")}</h3>
          <form name = 'fm' method='post'>
            <input type='text' name='nm' value='강감찬'>
            <input type='text' name='age' value='30'>
            <button type='submit'>입력</button>
          </form>
          `);
    },
    ["/json"]() {
      const j = { id: 1, name: "홍길동" };
      res.writeHead(200, { "Content-type": "application/json; charset=utf-8" });
      if (req.method === "POST") {
        j.nm = body["nm"];
        j.age = body["age"];
      }
      res.end(JSON.stringify());
    },
    ["/favicon.ico"]() {
      res.writeHead(200, { "Content-type": "image/x-icon; charset=utf-8" });
      const fav = createReadStream();
    },
    ["/testimg.png"]() {
      readFile("./public/node.png");
    },
  });

  req.setEncoding("utf-8");
  let body = "";
  req.on("data", (chunk) => {
    body += decodeURI(chunk);
    console.log("chuck>>>", body);
  });
  req.on("end", (data) => {
    router()[pathname](new URLSearchParams(body));
  });
  //   res.end("END");
}).listen(80, "127.0.0.1", () => console.log("start server"));
server.on("error", (error) => console.error("ERROR>>", error));
server.on("close", () => console.log("server closed!!"));
