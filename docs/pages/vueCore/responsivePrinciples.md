# [Vue 响应式原理](https://mp.weixin.qq.com/s/GVq25Q_3Jo9ELo5vugyy-w): <span style="color:#0396FF">依赖收集</span>和<span style="color:#0396FF">依赖更新</span>

## 1. 数据响应式是什么？

所谓数据响应式就是**建立`响应式数据`与`依赖`（调用了响应式数据的操作）之间的关系**，当响应式数据发生变化时，可以通知那些使用了这些响应式数据的依赖操作进行相关更新操作，可以是 DOM 更新，也可以是执行一些回调函数。

## 2. Vue2 响应式：基于 `Object.defineProperty()`实现的。

::: info 有以下缺点：
<span style="color:#0396FF"><strong>defineProperty</strong> 定义对象不能监听添加额外属性或修改额外添加的属性的变化</span>

<span style="color:#0396FF"><strong>defineProperty</strong> 定义对象不能监听根据自身数组下标修改数组元素的变化</span>
:::

Vue2 提供了两个属性方法解决了这个问题：`Vue.$set`和`Vue.$delete`。

```js
this.$delete(this.student, "name"); // 删除student对象属性name
this.$set(this.student, "age", "21"); // 添加student对象属性age
this.$set(this.student.hobby, 0, "王者"); // 更新student对象属性hobby数组
```

- **为什么 Vue2 新增响应式属性要通过额外的 API？**
  这是因为 Object.defineProperty **只会对属性进行监测，而不会对对象进行监测**，为了可以监测对象 Vue2 创建了一个 `Observer` 类。**Observer 类的作用就是把一个对象全部转换成响应式对象**，包括子属性数据，当对象新增或删除属性的时候负责通知对应的 `Watcher` 进行更新操作。

::: details **vm.$set 的实现原理**
当向一个响应式对象新增属性的时候，需要对这个属性重新进行响应式的设置，即使用 defineReactive 将新增的属性转换成 getter/setter。

我们在前面讲过每一个对象是会通过 Observer 类型进行包装的，并在 Observer 类里面创建一个属于这个对象的依赖收集存储对象 dep， 最后在新增属性的时候就通过这个依赖对象进行通知相关 Watcher 进行变化更新。

```js
function set(target, key, val) {
  const ob = target.__ob__;
  defineReactive(ob.value, key, val);
  ob.dep.notify();
  return val;
}
```

:::

::: details **vm.$delete 的实现原理**

```js
function del(target, key) {
  const ob = target.__ob__;
  delete target[key];
  ob.dep.notify();
}
```

:::

我们可以看到 vm.$delete 的实现原理和 vm.$set 的实现原理是非常相似的。
通过 vm.$delete 和 vm.$set 的实现原理，我们可以更加清晰地理解到 Observer 类的作用，Observer 类就是给一个对象也进行一个监测，因为 Object.defineProperty 是无法实现对对象的监测的，但这个监测是手动，不是自动的。

## 3. Vue3 响应式：基于 `Proxy` 实现的

**Proxy**：解决了上面两个弊端，proxy 可以实现：
<span style="color:#0396FF">可以直接监听对象而非对象属性，可以监听对象添加额外属性的变化;</span>

**Proxy** <span style="color:#0396FF">返回的是一个新对象,而 Object.defineProperty 只能遍历对象属性直接修改。</span>

**支持多达 13 种拦截方法** <span style="color:#0396FF">不限于 apply、ownKeys、deleteProperty、has 等等是 Object.defineProperty 不具备的。</span>

## 4. Vue2 响应式原理：

> 这里基于 Vue2.6.14 版本进行分析

1. 通过 `Object.defineProperty()`对每个属性进行监听，当**对属性进行读取的时候就会触发 getter，对属性修改的时候就会触发 setter**。首先我们都知道 Vue 实例中有 data 属性定义响应式数据，
2. data 中的每一个属性都会带 `__ob__` 属性，它是一个 `Observer` 对象，其实 Vue2 中响应式的关键就是这个对象，在 data 中的每一个属性都会带 get、set 方法，而 Vue 源码中其实把 get、set 分别定义为 reactiveGetter、reactiveSetter，
3. **给 data 属性创建 Observer 实例**：通过初注册响应式函数 initState 中调用了 initData 函数实现为 data 创建 Observer 实例。

```js
function initData(vm: Component) {
  // 获取组件中声明的data属性
  let data: any = vm.$options.data
  // 对new Vue实例下声明、组件中声明两种情况的处理
  data = vm._data = isFunction(data) ? getData(data, vm) : data || {}
  ...
  // observe data
  const ob = observe(data) // 为data属性创建Observer实例
  ob && ob.vmCount++
}
```

4. **通过 Observer 实例把 data 中所有属性转换成 getter/setter 形式来实现响应性**：对 data 属性分为两种情况处理：**对象属性处理**（defineReactive 实现）和**数组属性处理**。

5. **在 getter 收集依赖，在 setter 中触发依赖**：当读取 data 中的数据时，会在 get 方法中收集依赖，当修改 data 中的数据时，会在 set 方法中通知依赖更新。defineReactive 方法中主要是做四件事情：`创建Dep实例`、`给对象属性添加get/set方法`、`收集依赖`、`通知依赖更新`。 `dep.depend()`实现了依赖收集，`dep.notify()`实现了通知依赖更新

6. **实现对数组的监听**: `Object.defineProperty`是用来监听对象指定属性的变化，不支持数组监听(但`Object.defineProperty`可以监听数组的变化)，data 中的数据被赋予响应性都是在`Observer`中实现的，那么监听的实现也是在 Observer 对象中实现的，**先对数组的特定方法做自定义处理，为了拦截数组元素通知依赖更新，然后才通过 observeArray 函数遍历创建 Observer 实例**，主要分为两种情况：

```js
// 源码Observer类中对数组处理的部分代码
if (Array.isArray(value)) {
  if (hasProto) {
    protoAugment(value, arrayMethods);
  } else {
    copyAugment(value, arrayMethods, arrayKeys);
  }
  this.observeArray(value);
}
```

- **当浏览器支持`proto` 对象**：强制赋值当前 arrayMethods 给 target 的 `proto` 对象，直接给当前 target 数组带上自定义封装的数组方法，从而实现监听数组变化。其实 arrayMethods 处理后就是下面这样一个对象：

```js
protoAugment(value, arrayMethods);

function protoAugment(target, src: Object) {
  target.__proto__ = src;
}
```

- **当浏览器不支持`__ proto __` 对象**：遍历数组元素通过 defineProperty 定义为元素带上自定义封装的原生数组方法，由于自定义数组方法中做了拦截通知依赖更新，从而实现监听数组的变化。

```js
const arrayKeys = Object.getOwnPropertyNames(arrayMethods);
// vue2自己封装的7个原生数组方法
console.log(arrayKeys); // ['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse']
copyAugment(value, arrayMethods, arrayKeys);

function copyAugment(target: Object, src: Object, keys: Array<string>) {
  for (let i = 0, l = keys.length; i < l; i++) {
    const key = keys[i];
    def(target, key, src[key]); // 遍历数组元素通过为元素带上
  }
}
```

**Vue2 响应式原理小结：**

- 给 data 创建 Observer 实例。
- Observer 类实现对数据封装 getter、setter 的响应性。
- 针对数组类型数据，自定义封装 Array 原生方法，在封装过程中拦截执行通知依赖更新。
- 真正通过 Watcher 通知依赖更新，通过 run 方法中的 cb 回调函数，实现类似 watch 侦听器第二参数中监听变化后的操作。

## 5. Vue3 响应式原理

> 这里基于 Vue3.2.41 版本进行分析

1. Vue3 通过创建 Proxy 的实例对象而实现的，它们都是收集依赖、通知依赖更新。而 Vue3 中把依赖命名为副作用函数`effect`，也就是数据改变发生的副作用

```js
const house = { status: "未出租", price: 1200, type: "一房一厅" };
const obj = new Proxy(house, {
  get(target, key) {
    return target[key];
  },
  set(target, key, newVal) {
    target[key] = newVal;
    return true;
  },
});
function effect() {
  console.log("房子状态：" + obj.status);
}

effect(); // 触发了proxy对象的get方法
obj.status = "已出租！";
effect();
```

通过 Proxy 创建一个代理对象，把 house 代理给 obj，obj 是代理对象，house 是被代理对象。house 对象中数据改变，由于 effect 函数读取了对象属性，所以当数据改变，也需要及时更新副作用函数 effect。但是问题来了，假如对象中多个属性的，依赖于数据变化的多个副作用函数，数据变化一次都需要执行一次

```js
const objSet = new Set();
const obj = new Proxy(house, {
  // 拦截读取操作
  get(target, key) {
    objSet.add(effect); // 收集effect
    return target[key];
  },
  set(target, key, newVal) {
    target[key] = newVal;
    objSet.forEach((fn) => fn()); // 遍历effect
    return true;
  },
});
```

把副作用函数都存到 Set 实例中，Set 可以过滤重复数据，然后在获取数据中收集副作用函数，在修改数据中遍历执行副作用函数，这样就简化了代码，不需要每次改变都要执行一次了，也就是修改一次数据及时更新 effect。

2. **假如这个副作用函数是一个匿名函数，这时候需要怎么处理？** 添加一个全局变量临时存储。

```js
effect(() => console.log("房子状态：" + obj.status)); // 上面的例子会直接报not define
```

```js
// 添加一个全局变量activeEffect存储依赖函数，这样effect就不会依赖函数的名字了
let activeEffect;
function effect(fn) {
  activeEffect = fn;
  // 执行副作用函数
  fn();
}
```

3. **假如读取不存在的属性的时候，副作用函数发生什么？** 副作用函数会被重新执行，由于**目标字段与副作用函数没有建立明确的函数联系**。所以这就需要引入唯一 key 辨识每一个数据的副作用函数，以 target（目标数据）、key（字段名）、effectFn（依赖）。分三种情况：

- **两个副作用函数同时读取同一个对象的属性值**：
- **一个副作用函数中读取了同一个对象不同属性**：
- **不同副作用函数中读取两个不同对象的相同属性**：

  所以为了解决这些不同情况的副作用保存问题，Vue3 引入了`Weak、Map、Set`三个集合方法来保存对象属性的相关副作用函数：
  **`WeekMap存储对象`、`Map存储属性`、`Set存储副作用函数`**

```js
const weakMap = new WeakMap();
let activeEffect;
const track = (target, key) => {
  if (!activeEffect) {
    return;
  }
  // 从weakMap中获取当前target对象
  let depsMap = weakMap.get(target);
  if (!depsMap) {
    weakMap.set(target, (depsMap = new Map()));
  }
  // 从Map中属性key获取当前对象指定属性
  let deps = depsMap.get(key);
  if (!deps) {
    // 副作用函数存储
    depsMap.set(target, (deps = new Set()));
  }
  deps.add(activeEffect);
};
const trigger = (target, key) => {
  // 从weakMap中获取当前target对象
  const depsMap = weakMap.get(target);
  if (!depsMap) return;
  // 从Map中获取指定key对象属性的副作用函数集合
  const effects = depsMap.get(key);
  effects && effects.forEach((fn) => fn());
};
```

4. **WeakMap 与 Map 的区别是？** 区别就是垃圾回收器是否回收的问题，**WeakMap 对象对 key 是弱引用**，如果 target 对象没有任何引用，可以被垃圾回收器回收，这就需要它了。相对于 WeakMap，不管 target 是否引用，Map 都不会被垃圾回收，容易造成内存泄露。

5. **假如在一个副作用函数中调用了对象的两个属性，但是有布尔值控制**，按正常来说，副作用函数只能执行一次 get 获取值的，但是我们现有的实现方法还实现不了，所以可以先把它从所有与之关联的依赖集合中删除

```js
// 清空副作用函数依赖的集合
function cleanupEffect(effect: ReactiveEffect) {
  const { deps } = effect;
  if (deps.length) {
    for (let i = 0; i < deps.length; i++) {
      deps[i].delete(effect);
    }
    deps.length = 0;
  }
}
```

6. **嵌套副作用函数处理**：由于副作用函数可能是嵌套，比如副作用函数中 effectFn1 中有还有一个副作用函数 effectFn2，以上面的方法对于嵌套函数的处理用全局变量 activeEffect 来存储通过 effect 函数注册的副作用函数，这意味着**同一时刻 activeEffect 所存储的副作用函数只能有一个**，当副作用函数发生嵌套时，**内层副作用函数的执行会覆盖 activeEffect 的值**

   处理：**当执行副作用函数的时候把它入栈，执行完毕后把它出栈。**

   - **按位跟踪标记递归深度方式（优化方案）**：通过用二进制位标记当前嵌套深度的副作用函数是否记录过，如果记录过就删除，如果已经超过最大深度，因为采用降级方案，是全部删除然后重新收集副作用函数的。

```js
let effectTrackDepth = 0; // 当前副作用函数递归深度
export let trackOpBit = 1; // 在track函数中执行当前的嵌套副作用函数的标志位
const maxMarkerBits = 30; // 最大递归深度支持30位，
```

> 为什么需要设置 30 位，因为 31 位会溢出。

```js
/ 每次执行 effect 副作用函数前，全局变量嵌套深度会自增1
trackOpBit = 1 << ++effectTrackDepth

// 执行完副作用函数后会自减
trackOpBit = 1 << --effectTrackDepth;
```

> 为什么是左移一位，是因为第一位也就是说当前深度只是 1，所以保持不变，不用管，从第二位开始。

```js
if (effectTrackDepth <= maxMarkerBits) {
  // 执行副作用函数之前，使用 `deps[i].w |= trackOpBit`对依赖dep[i]进行标记，追踪依赖
  initDepMarkers(this);
} else {
  // 降级方案：完全清理
  cleanupEffect(this);
}
```

如何判断当前依赖是否已记录过，通过按位与判断是否有位已经标识，有就大于 0：

```js
//代表副作用函数执行前被 track 过
export const wasTracked = (dep: Dep): boolean => (dep.w & trackOpBit) > 0;
//代表副作用函数执行后被 track 过
export const newTracked = (dep: Dep): boolean => (dep.n & trackOpBit) > 0;
```

- **清理依赖：**

```js
export const finalizeDepMarkers = (effect: ReactiveEffect) => {
  const { deps } = effect;
  if (deps.length) {
    let ptr = 0;
    for (let i = 0; i < deps.length; i++) {
      const dep = deps[i];
      // 有 was 标记但是没有 new 标记，应当删除
      if (wasTracked(dep) && !newTracked(dep)) {
        dep.delete(effect);
      } else {
        // 需要保留的依赖
        deps[ptr++] = dep;
      }
      // 清空，把当前位值0，先按位非，再按位与
      dep.w &= ~trackOpBit;
      dep.n &= ~trackOpBit;
    }
    // 保留依赖的长度
    deps.length = ptr;
  }
};
```

- **完全清理方式（降级方案）**：逐个清理掉当前依赖集合 deps 中每个依赖。

```js
function cleanupEffect(effect: ReactiveEffect) {
  const { deps } = effect;
  if (deps.length) {
    for (let i = 0; i < deps.length; i++) {
      deps[i].delete(effect);
    }
    deps.length = 0;
  }
}
```

7. **响应式可调度性 scheduler**：trigger 动作触发副作用函数重新执行时，有能力决定副作用函数执行的时机、次数以及方式。

8. Vue3 响应式的关键在于两个函数：**`track`**（收集依赖）和 **`trigger`**（触发依赖）。

   **track:**

```js
// target: 响应式代理对象, type: 订阅类型(get、hase、iterate), key: 要获取的target的键值
export function track(target: object, type: TrackOpTypes, key: unknown) {
// 如果允许追踪, 并且当前有正在运行的副作用
  if (shouldTrack && activeEffect) {
  // 获取当前target订阅的副作用集合, 如果不存在, 则新建一个
    let depsMap = targetMap.get(target)
    if (!depsMap) {
      // 获取对应属性key订阅的副作用, 如果不存在, 则新建一个
      targetMap.set(target, (depsMap = new Map()))
    }
    let dep = depsMap.get(key)
    if (!dep) {
      depsMap.set(key, (dep = createDep()))
    }
    ...
    // 处理订阅副作用
    trackEffects(dep, eventInfo)
  }
}

export function trackEffects(dep: Dep,debuggerEventExtraInfo?: DebuggerEventExtraInfo) {
  let shouldTrack = false
  if (effectTrackDepth <= maxMarkerBits) { // 如果当前追踪深度不超过最大深度(30), 则添加订阅
    if (!newTracked(dep)) { // 如果未订阅过, 则新建
      dep.n |= trackOpBit // 据当前的追踪标识位设置依赖的new值
      shouldTrack = !wasTracked(dep) // 开启订阅追踪
    }
  } else {
    shouldTrack = !dep.has(activeEffect!)
  }

  if (shouldTrack) {
    dep.add(activeEffect!) // 将当前正在运行副作用作为新订阅者添加到该依赖中
    activeEffect!.deps.push(dep) // 缓存依赖到当前正在运行的副作用依赖数组
    ...
  }
}
```

**trigger:**

```js
// 根据不同的type从depsMap取出，放入effects，随后通过run方法将当前的`effect`执行
export function trigger(target: object,type: TriggerOpTypes,key?: unknown,newValue?: unknown,oldValue?: unknown,oldTarget?: Map<unknown, unknown> | Set<unknown>) {
  const depsMap = targetMap.get(target) // 获取响应式对象的副作用Map, 如果不存在说明未被追踪, 则不需要处理
  if (!depsMap) {
    return
  }
  let deps: (Dep | undefined)[] = []
  // 如果是清除操作，那就要执行依赖原始数据的所有监听方法。因为所有项都被清除了。
  if (type === TriggerOpTypes.CLEAR) { // clear
    // 如果是调用了集合的clear方法, 则要对其所有的副作用进行处理
    deps = [...depsMap.values()]
  } else if (key === 'length' && isArray(target)) {
    const newLength = Number(newValue)
    depsMap.forEach((dep, key) => {
      if (key === 'length' || key >= newLength) {
        deps.push(dep)
      }
    })
  } else { // set add delete
    // key不为void 0，则说明肯定是SET | ADD | DELETE这三种操作
    // 然后将依赖这个key的所有监听函数推到相应队列中
    if (key !== void 0) {
      deps.push(depsMap.get(key))
    }
    switch (type) { // 根据不同type取出并存入deps
      case TriggerOpTypes.ADD:
         // 如果原始数据是数组，则key为length，否则为迭代行为标识符
        if (!isArray(target)) {
          deps.push(depsMap.get(ITERATE_KEY))
          if (isMap(target)) {
            deps.push(depsMap.get(MAP_KEY_ITERATE_KEY))
          }
        } else if (isIntegerKey(key)) {
          deps.push(depsMap.get('length'))
        }
        break
      case TriggerOpTypes.DELETE:
       // 如果原始数据是数组，则key为length，否则为迭代行为标识符
        if (!isArray(target)) {
          deps.push(depsMap.get(ITERATE_KEY))
          if (isMap(target)) {
            deps.push(depsMap.get(MAP_KEY_ITERATE_KEY))
          }
        }
        break
      case TriggerOpTypes.SET:
        if (isMap(target)) {
          deps.push(depsMap.get(ITERATE_KEY))
        }
        break
    }
  }
  ...
    const effects: ReactiveEffect[] = []
    for (const dep of deps) {
      if (dep) {
        effects.push(...dep)
      }
    }
    // 遍历effects元素执行run函数
    triggerEffects(createDep(effects))
  }
}
```

9. **Vue3 响应式原理小结**：
   > Vue3 中的副作用函数其实就是 Vue2 的依赖

- **activeEffect 解决匿名函数问题**。

* **WeakMap、Map、Set 存储对象属性的相关副作用函数。**

- **处理副作用函数时，假如有多个响应式属性，控制只触发生效的属性或用到的属性。**
- **嵌套副作用函数，使用二进制位记录嵌套副作用，通过控制二进制位是否清理嵌套副作用实现层级追踪**
- **track()实现依赖收集、层级依赖追踪、依赖清理（解决嵌套副作用）**。
- **trigger()当某个依赖值发生变化时触发的, 根据依赖值的变化类型, 会收集与依赖相关的不同副作用处理对象, 然后逐个触发他们的 run 函数, 通过执行副作用函数获得与依赖变化后对应的最新值**

## 6. Object.defineProperty 真的不能监听数组的变化吗？

数组就是一个特殊的对象，它的下标就可以看作是它的 key，`Object.defineProperty` 是可以监听数组的变化的。

Vue2 弃用了这个方案的原因：

- 这种直接通过下标获取数组元素的场景就比较少，
- 其次即便通过了 Object.defineProperty 对数组进行监听，但也监听不了 push、pop、shift 等对数组进行操作的方法，所以还是需要通过对数组原型上的那 7 个方法进行重写监听。
- 为了性能考虑 Vue2 直接弃用了使用 Object.defineProperty 对数组进行监听的方案。

## 7. Vue2 中是怎么监测数组的变化的？

原理：使用拦截器覆盖 `Array.prototype`，之后再去使用 Array 原型上的方法的时候，其实使用的是拦截器提供的方法，在拦截器里面才真正使用原生 Array 原型上的方法去操作数组。

## 8. Vue3 中是怎么监测数组的变化？

在 Vue2 是不可以通过数组下标对响应式数组进行设置和读取的，而 Vue3 中是可以的，但是在 Vue3 中也需要像 Vue2 那样对一些数组原型上方法进行重写。
