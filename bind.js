// function fn(a,b,c,d){
//   console.log(a,b,c,d);
//   console.log(this);
// }

// const newFn = fn.bind('ctx',1,2)
// newFn(3,4)

Function.prototype.myApply = function (ctx, ...args) {
  console.log(...args);
  const context = ctx == undefined ? global : Object(ctx);
  let key = Symbol();
  context[key] = this;
  console.log(this);
  const result = context[key](...args);
  delete context[key];
  return result;
};

const r = Math.max.myApply(null, [12, 3]);
const r1 = Math.max.apply(null, [12, 3]);
console.log(r);
console.log(r1);
