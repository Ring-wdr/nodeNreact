const pro = (val) =>
  new Promise((res, rej) => {
    console.log(val);
    setTimeout(res, 1000, val);
  });

pro(1)
  .then((res, rej) => pro(res + 1))
  .then((res, rej) => pro(res + 1));

// pro(1)
//   .then((res, rej) => {
//     console.log(res);
//     console.timeEnd(res);
//     return pro(res + 1);
//   })
//   .then((res, rej) => {
//     console.log(res);
//     console.timeEnd(res);
//     return pro(res + 1);
//   })
//   .then((res, rej) => {
//     console.log(res);
//     console.timeEnd(res);
//   });
