function roll(n: number): [bigint, bigint] {
  let g = Array.from({ length: n + 1 }).fill(0n) as Array<bigint>;
  g[0] = 1n;
  g[1] = 1n;
  for (let i = 2; i <= n; i++) {
    for (let j = 1; j <= 6; j++) {
      if (i - j >= 0)
        g[i] += g[i - j]
    }
  }
  let ans = 0n;
  for (let j = 1; j <= 6; j++) {
    if (n - j >= 0) {
      ans += g[n - j] * BigInt(7 - j)
    }
  }
  return [g[n], ans]
}

for (let i = 1; i < 10; i++) {
  console.log(`roll(${i}) = [${roll(i)}]`)
}

console.log(`roll(610) = [${roll(610)}]`)
