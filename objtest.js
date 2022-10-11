const arr = ["a", "b", "c", "d"];
const arr2 = ["a", "b", "c", "e"];

const obj = {};

console.log(Object.keys(obj).length);

[
  ["utils"],
  ["tryThis"],
  ["king", "sejong", "nam"],
  ["king", "sejong", "d"],
].forEach((_arr) => {
  let node = obj;
  _arr.forEach((ele) => {
    if (!node[ele]) node[ele] = {};
    node = node[ele];
  });
});

console.log(Object.keys(obj));
console.log(JSON.stringify(obj));
