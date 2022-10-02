import url from "url";
import { toUnicode } from "punycode";
const sampleUrl =
  "https://jade:1234케잌@도메인.com:8080/p/a/한글/h?query=string&city=서울#hash";

// class MyURL extends URL {
//   /**
//    * @param {object} options - set options.
//    * example: fragment, auth, search
//    */
//   toString = ({
//     fragment = true,
//     auth = true,
//     search = true,
//     unicode = true,
//   } = {}) => {
//     const rets = [];

//     rets.push(this.protocol, "//");
//     auth && rets.push(this.username, ":", this.password, "@");
//     rets.push(unicode ? punycode.toUnicode(this.host) : this.host);
//     rets.push(this.pathname);
//     search && rets.push(this.search);
//     fragment && rets.push(this.hash);

//     if (unicode) return decodeURI(rets.join(""));
//     return rets.join("");
//   };
// }
// !options
//   ? super.href
//   : super.protocol +
//     "//" +
//     (options.auth ? super.username + ":" + super.password + "@" : "") +
//     super.host +
//     super.pathname +
//     (options.search ? super.search : "") +
//     (options.fragment ? super.hash : "");

function MyURL(urls) {
  this.params = new URL(urls);
  this.toString = function ({
    fragment = true,
    auth = true,
    search = true,
    unicode,
  } = {}) {
    // if (!options) return url.format(this.params, { unicode: true });
    const {
      protocol,
      username,
      password,
      host,
      pathname,
      search: sc,
      hash,
    } = this.params;
    return (
      protocol +
      "//" +
      (unicode
        ? (auth ? decodeURI(username) + ":" + decodeURI(password) + "@" : "") +
          toUnicode(host) +
          pathname
            .split("/")
            .map((val) => decodeURI(val))
            .join("/") +
          (search ? decodeURI(sc) : "") +
          (fragment ? decodeURI(hash) : "")
        : (auth ? username + ":" + password + "@" : "") +
          host +
          pathname +
          (search ? sc : "") +
          (fragment ? hash : ""))
    );
  };
}

const myurl = new MyURL(sampleUrl);

// const assert = (result, expected) => {
//   if (result === expected) return true;
//   else return false;
// };

// console.log(myurl.toString());

console.log(
  myurl.toString({ fragment: true, auth: true, search: true, unicode: false })
); // all default
// ⇒ https://jade:1234%EC%BC%80%EC%9E%8C@xn--5u5b99k.com:8080/p/a/%ED%95%9C%EA%B8%80/h?query=string&city=%EC%84%9C%EC%9A%B8#hash

console.log(
  myurl.toString({ fragment: false, auth: true, search: true, unicode: false })
);
// ⇒ https://jade:1234%EC%BC%80%EC%9E%8C@xn--5u5b99k.com:8080/p/a/%ED%95%9C%EA%B8%80/h?query=string&city=%EC%84%9C%EC%9A%B8

console.log(
  myurl.toString({ fragment: false, auth: true, search: true, unicode: true })
);
// ⇒ https://jade:1234케잌@도메인.com:8080/p/a/한글/h?query=string&city=서울

console.log(
  myurl.toString({ fragment: false, auth: false, search: true, unicode: true })
);
// ⇒ https://도메인.com:8080/p/a/한글/h?query=string&city=서울

console.log(myurl.toString({ fragment: false, auth: false, search: false }));
// ⇒ https://xn--5u5b99k.com:8080/p/a/%ED%95%9C%EA%B8%80/h

console.log(
  myurl.toString({ fragment: false, auth: false, search: false, unicode: true })
);

// console.log(myurl.toString({ fragment: false, auth: true, search: true }));

// console.log(myurl.toString({ fragment: false, auth: false, search: true }));

// console.log(myurl.toString({ fragment: false, auth: false, search: false }));

// console.log(
//   assert(
//     myurl.toString({ fragment: true, auth: true, search: true }),
//     "https://jade:1234%EC%BC%80%EC%9E%8C@sub.example.com:8080/p/a/t/h?query=string#hash"
//   )
// );
// console.log(
//   assert(
//     myurl.toString({ fragment: false, auth: true, search: true }),
//     "https://jade:1234%EC%BC%80%EC%9E%8C@sub.example.com:8080/p/a/t/h?query=string"
//   )
// );
// console.log(
//   assert(
//     myurl.toString({ fragment: false, auth: false, search: true }),
//     "https://sub.example.com:8080/p/a/t/h?query=string"
//   )
// );
// console.log(
//   assert(
//     myurl.toString({ fragment: false, auth: false, search: false }),
//     "https://sub.example.com:8080/p/a/t/h"
//   )
// );
