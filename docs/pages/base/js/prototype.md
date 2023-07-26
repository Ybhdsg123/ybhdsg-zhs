# 原型和原型链

:::tip

1. **原型是为了实现面向对象的手段，原型链是为了实现继承**
2. 实现面向对象的两种方式： **基于类**的面向对象和**基于原型**的面向对象
3. 通过原型能知道对象的类型，不然会丢失对象的类型
4. 通过一个**构造函数**实例化，产生一个**实例对象**，实例对象里会有一个 `_proto_`属性指向**原型对象**，**原型对象**里面记录该**实例对象**的类型，这个**实例对象**的 `constructor` 指回 **构造函数**，**构造函数**里面有一个 `prototype` 指向**原型对象**
5. 对于所有函数，属性`prototype`是`Object.prototype`的实例，例如：`js Array.prototype instanceof Object  //true`
6. 所有的对象都会继承来自 `Object.prototype` 的属性和方法。

:::

## 1. 基础知识（死记硬背）

1. **对象是某个特定引用类型的实例**，可以理解为对象要通过构造函数实例化实现的，而构造函数本身又是一个对象，构造函数本身又需要通过构造函数实例化实现。
2. js 提供了很多原生引用类型：Object、Array、Function、String、Number、Boolean、Date、RegExp，Map、WeakMap、Set、Symbol、BigInt 同时**它们都是原生构造函数**
3. **每个函数都是 Function 类型的实例，因此函数也是对象**
4. 对象都拥有**隐式原型（`__proto__` 属性）**，指向它的构造函数的**原型对象**（`prototype` 属性）
5. **每个构造函数都有一个`prototype` 属性(只有函数才有`prototype`属性)**，叫**原型对象(也叫显式原型)**（注意：原型对象，本质是对象），
6. 原型对象上有一个 `constructor` 属性指向构造函数本身。`Fn.prototype.constructor === Fn // true`
7. 通过 new 实例化出来的对象没有 `prototype` 属性
8. 对象都具有 `__proto__ `属性
9. 宇宙的尽头：**`Object.prototype.__proto__ === null`**

## 2. const obj = new Object()的原型链查找

对于 `const obj = new Object()`

1. 根据上面的规则 4 和 5 可以得知，`obj.__proto__ === Object.prototype`;
2. 根据规则 2、3、4 可以知道 `Object` 本身是引用类型也就是对象;
3. 根据规则 8，`Object` 拥有隐式原型 `__proto__`， 同时 `Object` 也是一个函数，而**函数都是 `Function` 的实例**，也就是` Object` 是 `Function` 的实例;
4. 因为对象的**隐式原型**（`__proto__属性`）指向它的构造函数的**原型对象**（`prototype 属性`） 所以：`Object.__proto__ === Function.prototype`;
5. 根据上面的规则 5，**`Function.prototype` 本质是对象**，
6. 根据规则 8，`Function.prototype` 拥有隐式原型 `__proto__`，而对象是通过原生构造函数 `Object` 实现的，所以 **`Function.prototype.__proto__ === Object.prototype`**;
7. 最后根据规则 9，**`Object.prototype.__proto__ === null`** 。
8. 至此，这整一个链路的过程也就是原型与原型链的原理解析过程，本质就是通过属性 **proto** 进行链接每一个节点对象。

```js
const obj = new Object();
// 实例对象的隐式原型指向它的构造函数的原型对象
obj.__proto__ === Object.prototype;
// Object 本身是原生引用类型也就是对象，而对象都拥有隐式原型，
// 同时 Object 又是原生构造函数，而函数都是 Function 的实例，可以简单理解为 Object 是通过构造函数 Function 实例化实现。
Object.__proto__ === Function.prototype;
// 原型对象本质是对象，而对象是通过原生构造函数 Object 实例化实现的
Function.prototype.__proto__ === Object.prototype;
// 宇宙的尽头
Object.prototype.__proto__ === null;
```

## 3. 有意思的一个类型 `Function`

### 3.1 每个函数都是 `Function`的实例

`Function` 是原生的引用类型，也就是对象，也就拥有**隐式原型**，**每个函数都是 `Function` 的实例**，所以 **`Function` 的隐式原型**就指向了**构造函数 `Function` 的原型对象**

```js
typeof Function === "function"; // true
Function instanceof Function === true; // true

Function.__proto__ === Function.prototype; // true
// 接下来跟上文一样
Function.prototype.__proto__ === Object.prototype;
Object.prototype.__proto__ === null;
```

### 3.2 普通函数也是`Function`实例

```js
function fn() {} // 函数声明定义函数
const fn = function () {}; // 函数表达式定义函数

// 因为每个函数都是 Function 的实例，函数实例对象 fn 的隐式原型指向它的构造函数的原型对象
fn.__proto__ === Function.prototype; // true
// 接下来跟上文一样
Function.prototype.__proto__ === Object.prototype;
Object.prototype.__proto__ === null;
```

### 3.3 原生构造函数的原型与原型链的关系

```js
// String 作为字符串的构造函数对象，String 也是通过的 Function 的实例化而来。所以
String.__proto__ === Function.prototype;

// Boolean 作为布尔类型的构造函数对象，Boolean 也是通过的 Function 的实例化而来。所以
Boolean.__proto__ === Function.prototype;

// Number 作为数字的构造函数对象，Number 也是通过的 Function 的实例化而来。所以
Number.__proto__ === Function.prototype;

// 同样其它的
Map.__proto__ === Function.prototype;
WeakMap.__proto__ === Function.prototype;
Set.__proto__ === Function.prototype;
```

## 4. 基础数据类型和引用数据类型

1. **引用类型**与**基本包装类型**的**主要区别是对象的生存期**。
2. 使用 `new` 操作符创建的**引用类型**的实例对象，在**执行流离开当前作用域之前都一直保存在内存中**。
3. 而自动创建的**基本包装类型的对象**，就只**存在代码执行的一瞬间，然后立即被销毁**。这意味着我们**不能在运行时为基本类型值添加属性和方法**。**为基本类型在代码执行的时候创建对应的基本包装类型，只是为了方便数据的操作。**

## 5. 关于 js 中一切皆对象

```js
const s = "Cobyte";
typeof s === "string"; // true
s.__proto__ === String.prototype; // true
s instanceof String; // false
```

基础数据类型在通过字面量形式创建时，会**对基础类型进行包装**，叫**基础包装类型**，在代码创建的一瞬间` const str = new String('cobyte')`，让这个字符串变量可以访问对象的一些属性和方法，但他本质并不是一个对象。但是通过 `new`关键字创建时，就为一个对象了。

## 6. 原型

- `prototype`一般称为显式原型，`__proto__`一般称为隐式原型，
- 每一个函数在创建之后，在默认情况下，会拥有一个名为 `prototype` 的属性，这个属性表示函数的原型对象。
- 每个 JavaScript 对象都有一个隐藏的原型属性——`__proto__`。

```js
function Fn() {}
const obj = new Fn();
// 对象 obj 的隐式原型指向构造函数 Fn 的原型对象
obj.__proto__ === Fn.prototype; // true
```

## 7. 原型链

- 当我们访问一个对象的属性时，JS 会先在这个对象定义的属性中进行查找，如果没有找到，就会沿着 `__proto__` 这个隐式原型关联起来的链条向上一个对象查找，这个链条就是原型链。

## 8. 构造函数，原型，实例的关系

- 每个构造函数都有一个原型对象(`prototype`属性)，原型对象都包含一个指向构造函数的指针(`constructor`属性)，实例都包含一个指向原型对象的内部指针(`__proto__`属性)

## 9. 继承

:::tip

1. `hasOwnProperty` 方法来检测对象上的属性是否是**自身定义**的还是**通过原型链继承**而来的。

:::

### 9.1 通过重写隐式原型属性

```js
const obj1 = {
  info: "cobyte",
  run: function () {
    console.log("run");
  },
};
const obj2 = {
  age: 18,
};
// 重写隐式原型属性
obj2.__proto__ = obj1;
obj2.info; // 'cobyte'
obj2.run(); // 'run'
```

### 9.2 通过`Object.create(proto,[propertiesObject])`方法(本质还是通过重写隐式原型属性)

```js
const obj1 = {
  info: "cobyte",
  run: function () {
    console.log("run");
  },
};
// 通过`Object.create(proto,[propertiesObject])`方法
const obj2 = Object.create(obj1, { age: { value: 18 } });
obj2.info; // 'cobyte'
obj2.run(); // 'run'
```

### 9.3 通过构造函数方式实现

- 不够严谨，单单修改子类原型对象为父类实例，那子类的构造函数会有问题，而且如果父类需要传参，这样实现的继承，在 new 子类实例的时候无法传参

```js
function Fn1() {
  this.age = 18;
}
Fn1.prototype.getAge = function () {
  return this.age;
};

function Fn2() {}
// 让构造函数 Fn2 的原型对象等于构造函数 Fn1 的实例对象
Fn2.prototype = new Fn1();

const fn2 = new Fn2();
fn2.age; // 18
fn2.getAge(); // 18
```

这里**本质是重写原型对象**。用原型与原型链理解的话就是：在进行 `new` 操作时，`new`操作在背后做了什么，

1. `fn2`的隐式原型`__proto__`指向了构造函数`Fn2`的显式原型`prototype`，
2. `Fn2.prototype`此时已经变了，变成了`fn1`的实例对象。
3. 这样 `fn2` 不仅拥有 `Fn1` 实例对象的全部属性和方法，而且 `Fn1` 实例的**隐式原型**指向 `Fn1` 的**显式原型**
4. 最终 `Fn1` 的 `prototype` 属性值的隐式原型指向 `Object.prototype`，这样最终实现继承了 `Object` 上的属性和方法。

**代码解释**

```js
fn2.__proto__ === Fn2.prototype; // 1. true
Fn2.prototype.__proto__ === Fn1.prototype; // 2.  true
Fn1.prototype.__proto__ === Object.prototype; // 3.  true
Object.prototype.__proto__ === null; // 4. true
```
