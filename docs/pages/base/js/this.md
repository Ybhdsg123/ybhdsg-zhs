# `this`的指向问题

参考文章: [this 实战例题总结分析](https://juejin.cn/post/7105756630519644168#heading-3)

:::tip

- **匿名函数的`this`永远指向`window`**
- 词法作用域在词法分析阶段就被确定了（写代码的时候就确定了），**js 是解释型语言，没有编译时，有预编译阶段**
- java 是编译型语言：java 的代码就是被编译为 .class 文件才能运行，这个**编译过程就是编译时**，**运行 `.class` 文件就是运行时。**

- 箭头函数本身没有`this`，因为**基于闭包**(本身没有，去外层寻找)，会去外层寻找`this`，**闭包属于词法作用域**（词法作用域是在编译时确定的）
- 箭头函数`this`指向谁，**决定于它定义的位置，而不是运行的位置**（因为**this => 闭包 => 词法作用域 => 编译时态确定**（js 没有编译，但是有预编译，编译时态就确定了词法作用域）

- `B.apply(A, arguments)`：即 A 对象应用 B 对象的方法 **`arguments`为数组**

- `B.call(A, arguments)`：即 A 对象应用 B 对象的方法 **`arguments`为列表项**

- `const newFn = fn.bind(A, arguments)`的作用是**只修改`this`指向，但不会立即执行 fn；会返回一个修改了 this 指向后的 f**n。需要调用才会执行:bind(thisArg, arg1, arg2, arg3, ...)()。**bind 的传参和 call 相同。**

:::

## 1. 普通函数的 `this`

- 在**非严格模式**下全局调用函数时，`this`指向`window`，在**严格模式**下 `this`为`undefined`(babel 转为 ES6 时，会自定加上 严格模式)

## 2. 箭头函数的 `this`

- 箭头函数的 `this` 的指向是由外层(函数或全局)作用域来决定的。

- **箭头函数体内的 this 对象，就是定义时所在的对象，而不是使用时所在的对象**。普通函数使用了严格模式 `this` 会指向 `undefined` 但箭头函数依然指向了 `window`

## 3. 函数作为对象内的方法时的`this`

:::details 例子

```js
const obj = {
  name: "coboy",
  age: 18,
  add: function () {
    console.log(this, this.name, this.age);
  },
  edit: function () {
    // 这里声明了一个 fn 函数，接着又马上执行了它，其实可以看做是一个匿名的自执行函数
    function fn() {
      console.log(this);
    }
    fn();
    // (function () {
    //   console.log(this);
    // })();
  },
  arrow: function () {
    const fn = () => {
      console.log(this);
    };
    fn();
  },
};
// 1. 谁调用了它，它就指向谁！
obj.add(); // {name: "coboy", age: 18, add: ƒ} "coboy" 18

// 2.  obj 对象方法 add 赋值给 fn 之后，fn 仍然在 window 的全局环境中执行，所以 this 仍然指向 window。
const fn = obj.add;
fn(); // window

// 3. 匿名函数的 this 永远指向 window！
obj.edit(); // window

// 4. 箭头函数的 this  是由外层函数作用域或者全局作用域决定的。
obj.arrow(); // {name: "coboy", age: 18, add: ƒ}   箭头函数 this 指向外层，这里就是obj
```

:::

## 4. 上下文对象调用中的 `this`

:::details 例子

```js
const animal = {
  name: "cat",
  age: 18,
  add: function () {
    return this;
  },
  dog: {
    name: "dog",
    getName: function () {
      console.log(this.name);
    },
  },
};
// 1. this 指向 animal 对象本身
console.log(obj.add() === animal); // true

// 2. 谁调用指向谁
animal.dog.getName(); // 'dog'
```

:::

## 5. 构造函数中的 `this` （通过 new）

- 通过 new 操作符来构建一个构造函数的实例对象，**这个构造函数中的 `this` 就指向这个新的实例对象（新创建的对象上），且优先级要比 bind 的高**。同时构造函数 `prototype` 属性下面方法中的 `this` 也指向这个新的实例对象。
- 构造函数中显式返回一个值，且**返回的是一个对象，那么 `this` 就指向返回的对象**，如果返回的不是一个对象，而是**基本类型，那么 `this` 仍然指向实例**。

:::details 例子

```js
// 1.  构造函数中 this
function Animal() {
  this.txt = "coboy";
  this.age = 100;
  console.log(this); // Animal  {txt: 'coboy', age: 100}
}
Animal.prototype.getNum = function () {
  return this.txt;
};
const a1 = new Animal();
console.log(a1); // Animal  {txt: 'coboy', age: 100}
console.log(a1.age); // 100
console.log(a1.getNum()); // 'coboy'

// 2. 构造函数中出现显式 return 的情况。
// 返回对象
function Animal() {
  this.txt = "coboy";
  const obj = { txt: "cobyte" };
  return obj;
}
const a1 = new Animal();
console.log(a1.txt); // cobyte

// 返回基本类型
function Animal1() {
  this.txt = "coboy";
  return 1;
}
const a1 = new Animal1();
console.log(a1.txt); // 'coboy'
```

:::

## 6. call

- `function.call(thisArg, arg1, arg2, ...)`：参数可以是任意数据类型

:::details 例子

```js
Math.max.call(Math, 1, 2, 3, 10); // 10
const obj = {
  txt: "coboy",
  age: 18,
  getName: function () {
    console.log(this, this.txt);
  },
};
const obj1 = {
  txt: "cobyte",
};
obj.getName(); // this指向obj
obj.getName.call(obj1); // this指向obj1
obj.getName.call(); // this指向window
obj.getName.call(obj1, "coboy1", "coboy2"); // 传参
```

:::

## 7. apply

- `function apply(thisArg, argsArray)`：参数`argsArray`为**数组类型**或者 **`arguments` 参数集合**。

:::details 例子

```js
Math.max.apply(Math, [1, 2, 3, 10]); // 10
const obj = {
  txt: "coboy",
  age: 18,
  getName: function () {
    console.log(this, this.txt);
  },
};
const obj1 = {
  txt: "cobyte",
};
obj.getName.apply(obj1); // this指向obj1
obj.getName.apply(); // this指向window
obj.getName.apply(obj1, ["coboy1", "coboy2"]); // 传参
```

:::

## 8. bind

- `bind()` 方法也能修改 `this` 指向，不过调用 `bind()` 方法**不会执行 `getName()`函数，也不会改变 `getName()` 函数本身**，只会返回一个已经修改了 `this` 指向的新函数，这个新函数可以赋值给一个变量，调用这个变量新函数才能执行 getName()。

:::details

```js
// 1. 无参数
const obj = {
  txt: "coboy",
  age: 18,
  getName: function () {
    console.log(this.txt);
  },
};
const obj2 = {
  txt: "cobyte",
};
const newGetName = obj.getName.bind(obj2);
newGetName(); // this指向obj2
obj.getName(); // this仍然指向obj

// 2. 有参数
function fn(a, b, c) {
  console.log(a, b, c);
}
const fn1 = fn.bind({ abc: 123 }, 600);
fn(100, 200, 300); // 100,200,300
fn1(100, 200, 300); // 600,100,200  // 改变 fn 的 this 时，传入了一个参数，会将这里的参数合并，fn(a,b,c) 只有三个参数，300 是第四个参数
fn1(200, 300); // 600,200,300
fn.call({ abc: 123 }, 600); // 600,undefined,undefined
fn.call({ abc: 123 }, 600, 100, 200); // 600,100,200
```

:::

## 9. this 的优先级

- `call`，`apply`，`bind`显示绑定比隐式绑定优先级高
- 构造函数的(new)比 `bind`优先级更高
- 箭头函数无法改变`this`指向

## 10. Function.prototype.call

call() 方法使用一个指定的 this 值和单独给出的一个或多个参数来调用一个函数。

**基本思想是把 fn.call(obj,args)中的 fn 赋值为 obj 的属性，然后调用 obj.fn 即可实现 fn 中 this 指向的改变**，还是那个确定的规律 **“谁调用它，this 就指向谁”**

```js {6,7}
Function.prototype._call = function (ctx, ...args) {
  // 判断传入的 ctx 是否为空，为空就挂在 全局window上，不然就创建一个对象
  const o = ctx == undefined ? window : Object(ctx);
  // 给 ctx 对象添加独一无二的属性
  const key = Symbol();
  // 绑定 this，谁调用， this 就为谁，这里为 obj.fun,(这里是为了实现call，改变this指向，就是让使用这个函数的this，指向 ctx)
  // 这里的 o = { name: "22",Symbol: fun(...args) }
  o[key] = this;
  // 执行函数，得到返回结果
  const result = o[key](...args);
  // 删除该属性
  delete o[key];
  return result;
};

const obj = {
  name: "11",
  fun(...args) {
    console.log(this.name);
  },
};

const obj2 = { name: "22" };
obj.fun(); // 11
obj.fun.call(obj2); // 22
obj.fun._call(obj2, 1, 2); // 22 1 2
```

## 11. Function.prototype.apply

**跟`call`是一样的思想，只不过传参是数组的形式**

```js
Function.prototype.myApply = function (ctx) {
  const context = ctx == undefined ? window : Object(ctx);
  let key = Symbol();
  context[key] = this;
  let result;
  if (arguments[1]) {
    //判断是否有第二个参数
    result = context[key](...arguments[1]); // 调用该方法，该方法this指向context
  } else {
    result = context[key]; // 调用该方法，该方法this指向context
  }
  delete context[key];
  return result;
};

const r = Math.max.myApply(null, [12, 3]);
const r1 = Math.max.apply(null, [12, 3]);
console.log(r); // 12
console.log(r1); //  12
```

## 12. Function.prototype.bind

- **绑定时可以传参数，之后执行的时候依然可以传参数，典型的闭包行为**
- `bind() `方法创建一个新的函数，在 bind() 被调用时，这个新函数的 this 被指定为 bind() 的第一个参数，而其余参数将作为新函数的参数，供调用时使用。

```js
const obj = {
  name: "11",
  fun() {
    console.log(this.name);
  },
};
Function.prototype._bind = function (ctx, ...args) {
  // 获取函数体
  const _self = this;
  // 用一个新函数包裹，避免立即执行
  const bindFn = (...reset) => {
    return _self.call(ctx, ...args, ...reset);
  };
  return bindFn;
};
const obj2 = { name: "22" };
obj.fun(); // 11
const fn = obj.fun.bind(obj2);
const fn2 = obj.fun._bind(obj2);
fn(); // 22
fn2(); // 22
```

## 13. New 关键字

new 运算符创建一个用户定义的对象类型的实例或具有构造函数的内置对象的实例。

```js
/*
  create函数要接受不定量的参数，第一个参数是构造函数（也就是new操作符的目标函数），其余参数被构造函数使用。
  new Create() 是一种js语法糖。我们可以用函数调用的方式模拟实现
*/
function create(Fn, ...args) {
  // 1、创建一个空的对象
  let obj = {}; // let obj = Object.create({});
  // 2、将空对象的隐式原型 __proto__ 指向构造函数的原型对象 prototype
  Object.setPrototypeOf(obj, Fn.prototype); // obj.__proto__ = Fn.prototype
  // 以上 1、2步还可以通过 const obj = Object.create(Fn.prototype) 实现
  // 3、改变构造函数的上下文（this）,并将参数传入
  let result = Fn.apply(obj, args);
  // 4、如果构造函数执行后，返回的结果是对象类型，则直接将该结果返回，否则返回 obj 对象
  return result instanceof Object ? result : obj;
  // return typeof result === 'object' && result != null ? result : obj
}
```
