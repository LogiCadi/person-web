const setDelay = millisecond => {
  return new Promise((resolve, reject) => {
    if (typeof millisecond != "number")
      reject(new Error("参数必须是number类型"));
    setTimeout(() => {
      resolve(`我延迟了${millisecond}毫秒后输出的`);
    }, millisecond);
  });
};

const setDelaySecond = seconds => {
  return new Promise((resolve, reject) => {
    if (typeof seconds != "number" || seconds > 10)
      reject(new Error("参数必须是number类型，并且小于等于10"));
    setTimeout(() => {
      resolve(`我延迟了${seconds}秒后输出的，是第二个函数`);
    }, seconds * 1000);
  });
};

// setDelay(2000)
//   .then(result => {
//     console.log(result);
//     console.log("我进行到第一步的");
//     return setDelaySecond(3);
//   })
//   .then(result => {
//     console.log("我进行到第二步的");
//     console.log(result);
//   })
//   .catch(err => {
//     console.log(err);
//   });

(async () => {
   const res = await setDelay(2000)
   console.log(res)
})()

class PromiseFaker extends Promise {
  constructor(main) {
    super(main);
    main(result => {
      this.result = result;
      this.resolveDone();
    });
  }
  then(resolveFn) {
    this.resolveFn = resolveFn;
    this.resolveDone();
  }

  resolveDone() {
    if (this.resolveFn && this.result) {
      this.resolveFn(this.result);
    }
  }
}

const p = new PromiseFaker(resolve => {
  setTimeout(() => {
    resolve("promise resolve");
  }, 2000);
});

// p.then(res => {
//   console.log(res);
// });

(async () => {
  const res = await new PromiseFaker(resolve => {
    setTimeout(() => {
      resolve("promise resolve");
    }, 2000);

    console.log(res);
  });
})();
