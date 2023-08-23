// 可以引⼊的库和版本相关请参考 “环境说明”
// 请通过输出方法打印代码运行结果，“运行”后在控制台查看输出信息
// function main（）入口函数请勿修改，以防执行失败

const __ = Symbol('PLACEHOLDER');

function isPlaceholder(value: any) {
  return typeof value === 'symbol' && value === __
}

function allNotPlaceholder(args: any[]) {
  return args.every(arg => !isPlaceholder(arg))
}

function placeholder(fn: (...args: any[]) => any, ...bound: any[]) {
  // show me your code
  const cacheFn = fn
  const argList = Array.from({ length: fn.length }).fill(null)
  for (let i = 0; i < bound.length; i++) {
    if (!isPlaceholder(bound[i])) {
      argList[i] = bound[i]
    }
  }
  return function (...bound: any[]) {
    if (allNotPlaceholder(bound)) {
      let j = 0
      const args = [...argList]
      for (let i = 0; i < bound.length; i++) {
        for (; j < args.length; j++) {
          if (args[j] === null) {
            args[j] = bound[i]
            break
          }
        }
      }
      if (args.every(arg => arg !== null)) {
        return cacheFn.apply(null, args)
      } else {
        return placeholder(cacheFn, ...args)
      }
    } else {
      let index = 0
      while (argList[index] !== null) {
        index++
      }
      for (let i = 0; i < bound.length; i++) {
        if (!isPlaceholder(bound[i])) {
          argList[index] = bound[i]
        }
        index += 1
      }
      return placeholder(cacheFn, ...argList)
    }
  };
}


declare const require: any;

function main1() {
  const assert = require('assert');

  function dot(x1: number, y1: number, x2: number, y2: number) {
    return x1 * x2 + y1 * y2;
  }
  const p1 = placeholder(dot, 3, 4)
  assert.deepStrictEqual(typeof placeholder(dot, 2, __, __, 4), 'function');
  assert.deepStrictEqual(placeholder(dot, 10, __, 10, __)(2, 3), dot(10, 2, 10, 3));
  assert.deepStrictEqual(placeholder(dot, __, __, __, 5)(4, __, 2)(__)(3), dot(4, 3, 2, 5));
  assert.deepStrictEqual(placeholder(dot, 3)(__, __)(4, __, 2)(3), dot(3, 4, 3, 2));
  assert.deepStrictEqual(placeholder(dot)(3, __, __, 4)(5, 6), dot(3, 5, 6, 4));
  assert.deepStrictEqual(placeholder(dot, 3, 4, 5, 3)(), dot(3, 4, 5, 3));
  assert.deepStrictEqual(p1(5, 6), dot(3, 4, 5, 6));
  assert.deepStrictEqual(p1(7, 8), dot(3, 4, 7, 8));
  assert.deepStrictEqual(p1(5)(6), dot(3, 4, 5, 6));
  assert.deepStrictEqual(p1(7)(8), dot(3, 4, 7, 8));
  console.log('PASSED!');
}

main1()
