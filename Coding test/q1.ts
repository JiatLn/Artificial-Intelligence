function f1(n: number, cache = new Map<number, bigint>()): bigint {
  if (n <= 1) return BigInt(n)
  if (cache.has(n)) {
    return cache.get(n)!
  }
  const a1 = f1(n - 2, cache)
  cache.set(n - 2, a1)
  const a2 = f1(n - 1, cache)
  cache.set(n - 1, a2)
  return a1 + a2
}

function f2(n: number) {
  if (n <= 1) return BigInt(n)
  let first = 0n;
  let second = 1n;
  for (let i = 2; i <= n; i++) {
    [first, second] = [second, first + second]
  }
  return second
}

console.time('calc - f1');
const ans1 = f1(9292);
console.timeEnd('calc - f1');

console.time('calc - f2');
const ans2 = f2(9292);
console.timeEnd('calc - f2');

console.log(`f(9292) = ${ans1}`)
