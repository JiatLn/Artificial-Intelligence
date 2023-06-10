function f(n: number, cache = new Map<number, bigint>()): bigint {
  if (n <= 1) return BigInt(n)
  if (cache.has(n)) {
    return cache.get(n)!
  }
  const f2 = f(n - 2, cache)
  cache.set(n - 2, f2)
  const f1 = f(n - 1, cache)
  cache.set(n - 1, f1)
  return f1 + f2
}

console.time('calc');
const ans = f(9292);
console.timeEnd('calc');
console.log('ans', ans);
