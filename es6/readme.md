### 对象字面量增强写法

1. 变量名简写
2. 函数名简写
3. 变量名为计算属性

```js
const obj = {
  // name: name,
  name,
  // foo: function() {},
  foo() {},
  // 
  [name + '123']: 'xxx',
}
```

### 对象和数组的解构语法

解构语法 支持默认值

- 数组解构

```js
const arr = [1, 2, 3]
const [a, b, c, d = 2] = arr
a // 1
b // 2
c // 3
```

- 对象解构

解构变量重命名
支持默认值

```js
const obj = {
  name: "cx33",
  age: 18
}
const { name: nickName, age = 18 } = obj
name // cx33
age // 18
```

### var/let/const

创建的变量会被保存到 VariableMap 里面 - V8引擎

`var`: 

~~设计缺陷~~

1. 作用域提升
2. 没有块级作用域
3. `window` 全局对象

`let`: 

1. 无法重新声明 *块范围*变量
2. 不存在变量提升，声明前访问会报错（词法环境被实例化，但是不可访问，直到词法绑定被求值）
3. `for` 循环 会生成块级作用域 - 声明的变量仅在块级作用域内有效
4. 不会添加到 `window` 对象上

`const`: 

1. 声明常量 值（引用 - 内存地址）不可修改

### 块级作用域

ES5 只有全局作用域和函数作用域，没有块级作用域

ES6 块级作用域 对 `var` 声明的类型无效 对 `let/const/function/class`，外部无法访问

> `function` 声明为了兼容旧代码，（浏览器）环境实现不同会有不同的结果，~~外部可访问~~。

暂时性死区

```js
var foo = "123"
if (true) {
  console.log(foo); // ReferenceError
  //           ^
  // 暂时性死区
  let foo = "666";
}
```

### 模板字符串

方便，可读性高

```js
const info = `name: ${name}`
```

标签模板 (tagged template) 字符串

```js
console.log`age: ${18}?${'cx33'}` // [ 'age: ', '?', '' ] 18 cx33
```

应用：React styled-components

### 函数的默认参数

```js
function foo(x, y = 1 /* ES6 */) {
  // ES5: y = y ?? 1
  return  x + y
}

foo(1)
foo(1, 2)
```

### 函数的剩余参数

替代 `arguments`

```js
function foo(x, ...y) {
  console.log(x) // 1
  console.log(y) // [2, 3, 4]
  console.log(arguments) // [Arguments] { '0': 1, '1': 2, '2': 3, '3': 4 }
}

foo(1, 2, 3, 4)
```

### 箭头函数

- 箭头函数没有自己的 `this` 对象
- 不能作为构造函数 没有显式原型
- 没有 `arguments` 对象

### 展开语法

```js
function foo(x, y, z) {}

foo(...[1, 2, 3])

const arr1 = [1, 2, 3]
const arr2 = [4, 5, 6]
const arr3 = [...arr1, ...arr2] // [1, 2, 3, 4, 5, 6]
```

浅拷贝

```js
const info = {
  name: 'cx33',
  link: {
    url: 'aaa'
  }
}

const obj = { ...info }
obj.link.url = 'bbb'

console.log(info.link.url) // 'bbb'
```

### 数值的表示

- 二进制和八进制表示法

```js
// - 十进制
100
// - 二进制
0b100
// - 八进制
0o100
// - 十六进制
0x100
```

- 数值分隔符

```js
const big = 10_000_000_000
```

### Symbol

生成独一无二的值

```js
const s1 = Symbol()
const s2 = Symbol()

s1 === s2 // fasle

const s3 = Symbol.for('description');
const s4 = Symbol.for('description');

s3 === s4
```

基本数据类型

可以作为对象属性名 - 解决对象属性名冲突

在 `Object.keys` 遍历的时候 获取不到，需要通过 `Object.getOwnPropertySymbols(obj)` 获取

### Set 数据结构

```js
const set = new Set()
set.add(1)
set.add(1)
set.add(2)
set.size // 2
set.add({})
set.add({}) // ({}) !== ({})
set.size // 4
const obj = {}
set.add(obj)
set.add(obj)
set.size // 5
set.delete(obj)
set.size // 4
set.has(1) // true
set.clear()
set.size // 0
```

应用：对数组去重

```js
const arr1 = [1, 2, 3, 3, 4]
const arr2 = [...new Set(arr1)]
arr2 // [1, 2, 3, 4]
```

### WeakSet

只存放对象类型，不存放基本数据类型

建立的引用是弱引用，GC 垃圾回收

WeakSet 没有 `size` 属性，没有办法遍历它的成员

### Map

对象类型作为 `key` 值

```js
const map = new Map()
const obj1 = { name: 1 }
const obj2 = { name: 2 }
map.set(obj1, "o1")
map.set(obj2, "o2")
map // Map(2) { { name: 1 } => 'o1', { name: 2 } => 'o2' }
map.size // 2
map.get(obj1) // o1
map.has(obj2) // true
map.delete(obj1) // true
map.size // 1
map.clear()
map.size // 0
```
