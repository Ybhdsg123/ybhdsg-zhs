// function fn(a,b,c,d){
//   console.log(a,b,c,d);
//   console.log(this);
// }

// const newFn = fn.bind('ctx',1,2)
// newFn(3,4)
const obj = {
  name: "11",
  fun(...agrs) {
    console.log(this.name,...agrs);
  },
};
Function.prototype._call = function (ctx, ...args) {
  console.log(ctx,...args);
  // console.log(this);
  // console.log(obj.fun === this);
  // 判断传入的 ctx 是否为空，为空就挂在 全局window上，不然就创建一个对象
  const o = ctx == undefined ? window : Object(ctx);
  // 给 ctx 对象添加独一无二的属性
  const key = Symbol();
  // 绑定调用的 this，谁调用的， this 就为谁，这里就是 fun
  // { name: "22",Symbol: fun() };
  o[key] = this;
  // 执行函数，得到返回结果
  const result = o[key](...args);
  // 删除该属性
  delete o[key];
  return result;
};



const obj2 = { name: "22" };
// obj.fun(); // 11
// obj.fun.call(obj2); // 22
obj.fun._call(obj2,1,2); // 22

const arr = [1,2,3,1]
console.log(Math.max.apply(arr,[1,23]));
console.log(Math.max.apply(1,arr));


// call和apply实现方式类似，只是传参的区别
// 基本思想是把fn.call(obj,args)中的fn赋值为obj的属性，然后调用obj.fn即可实现fn中this指向的改变
// Function.prototype.myCall = function(context = window){ //myCall函数的参数，没有传参默认是指向window
//   context.fn = this //为对象添加方法（this指向调用myCall的函数）
//   let args = [...arguments].slice(1) // 剩余的参数
//   let res = context.fn(...args)  // 调用该方法，该方法this指向context
//   delete context.fn //删除添加的方法
//   return res
// }

// Function.prototype.myApply = function(context = window){ //myCall函数的参数，没有传参默认是指向window
//   context.fn = this //为对象添加方法（this指向调用myCall的函数）
//   let res
//   if(arguments[1]){ //判断是否有第二个参数
//     res = context.fn(...arguments[1])// 调用该方法，该方法this指向context
//   }else{
//     res = context.fn()// 调用该方法，该方法this指向context
//   }
//   delete context.fn //删除添加的方法
//   return res
// }

// // 验证
// function sayName(name= 'wwx',age= 18){
//   this.name = name
//   this.age = age
//   console.log(this.name)
//   return this.age
// }
// var obj = {
//   name : 'zcf',
//   age:24
// }
// var age = sayName.myCall(obj,"wxxka",19) // 19
// var age1 = sayName.myApply(obj,["wwxSSS",20]) //20