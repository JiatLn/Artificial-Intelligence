## Q1

Where n is a positive integer, the function `f(n)` satisfies the  following.

```ts
f(0) = 0
f(1) = 1
f(n) = f(n - 1) + f(n - 2)
```

(1) Please create a program to finf `f(n)`.(You can write in any language that you are good at.)

(2) Use the program you created in (1) to find `f(9292)`.

My answer:

```ts
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
```

The output:

```ts
$ ts-node q1.ts 
calc - f1: 9.05ms
calc - f2: 13.008ms
f(9292) = 3661577246222677849785427206834745690320353572157656330500188244468089715055226822525574623888694874292151478596700484435570305109242313638033416669900444112247937728056211966758992460916419400444853615065999542615995870540182204923636128338003036402195497269318979305499067555417877218451841325150147307183407898442574610940236693637649259016140512151236060436731993551961323374694640088413329540217958532844994602127372986462480164986085899739239682944787995424271277467745382889616543410488579354418782072284268830659992928815496582634474475467254601183355700504643184963095650659016150303753725509080657414720402415839227967445769423409681729197862582729971824872388906214839490412361238387557198107844877079017174320960353286125955686041797566600910089428824579522915583067121845203670580431109038026031805366693865811657549114645180029223550684370620385942139952513596212989572901717566991028950391641339313551358249513768853983555921365314930744269060528453180853181277008706114560211720676164926069583198482669740034992505014190676786182619356298288614973174512790036679389133495600521574725844129972742430674736916672792625084641027990733249739459326440313013672649848254315756846997118764723139178365862765173488978551301801196364660097159749216505812815610240094570434388330501001490260829493982079774109976313795867953293232350445141140986017144615285056571297189775579577943476017486485426114739433921822640390808840316534298381708300360202292556716275696050116179146218599102060641783728510620700368611020522308508805066354267983031447439708738430830812299369590938039288063873607175095253952963248468206808754647017090147700831859035388796576278194027465866101615940691728994129932120206390739814141511226049882323886861245940252446697607680362853010694832168189803235002515372695099765714174685776789816323408545017065365758342146429980816094007713959447619038393467627366903822647919125618219011528539949951357869642550538579
```

## Q2

Please implement a program that lists the nodes of a random binary tree by nodes at the same depth.

My answer:

```ts
class TreeNode {
  value?: number
  left?: TreeNode
  right?: TreeNode
  constructor() {
    this.left = undefined
    this.right = undefined
    this.value = undefined
  }
  setVal(val: number) {
    this.value = val
  }
}

function buildBinaryTree(nodes: Array<number>): TreeNode {
  if (!nodes.length) {
    throw Error('the nodes must not empty.')
  }
  let root = new TreeNode()
  let stack = [root]
  while (nodes.length) {
    let value = nodes.shift()!
    let treeNode = stack.shift()!
    treeNode.setVal(value)
    if (!treeNode.left) treeNode.left = new TreeNode()
    if (!treeNode.right) treeNode.right = new TreeNode()
    stack.push(treeNode.left)
    stack.push(treeNode.right)
  }
  return root
}

function travelBinaryTree(root: TreeNode): Array<Array<number>> {
  let ans = [];
  let stack = [root]
  while (stack.length) {
    const size = stack.length
    let values = [];
    for (let i = 0; i < size; i++) {
      let node = stack.shift()!
      if (node.value !== undefined) values.push(node.value)
      if (node.left) stack.push(node.left)
      if (node.right) stack.push(node.right)
    }
    if (values.length) ans.push(values)
  }
  return ans
}

const binaryTree = buildBinaryTree([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
console.log('tree', binaryTree)
const ans = travelBinaryTree(binaryTree)
console.log('ans', ans)
```

The output:

```ts
$ ts-node q2.ts 
tree TreeNode {
  left: TreeNode {
    left: TreeNode { left: [TreeNode], right: [TreeNode], value: 4 }, 
    right: TreeNode { left: [TreeNode], right: [TreeNode], value: 5 },
    value: 2
  },
  right: TreeNode {
    left: TreeNode { left: [TreeNode], right: [TreeNode], value: 6 }, 
    right: TreeNode { left: [TreeNode], right: [TreeNode], value: 7 },
    value: 3
  },
  value: 1
}
ans [ [ 1 ], [ 2, 3 ], [ 4, 5, 6, 7 ], [ 8, 9, 10 ] ]
```

## Q3

(1) Imagine you are playing a board game. You roll a 6-faced dice and move forward the same 
number of spaces that you rolled. If the finishing point is “n” spaces away from the starting 
point, please implement a program that calculates how many possible ways there are to 
arrive exactly at the finishing point.

(2) If n = 610, how many possible ways are there to arrive exactly at the finishing point?

My answer:

- 假设1：如果距离终点 `k` 步，此时投出 `n > k`，需要重新投掷骰子，直到 `n <= k`。
- 假设2：如果距离终点 `k` 步，此时投出 `n >= k`，都算抵达终点。

```ts
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

console.log(`roll(610) = [${roll(610)}]`
```

The output:

两种假设分别两种答案：

```ts
$ ts-node q3.ts 
roll(1) = [1,6]
roll(2) = [2,11]
roll(3) = [4,21]
roll(4) = [8,41]
roll(5) = [16,81]
roll(6) = [32,161]
roll(7) = [63,321]
roll(8) = [125,636]
roll(9) = [248,1261]
roll(610) = [14527490260516100855695859704819627818108010882741117227956927412305738742399171256642436462028811566617818991926058940988565927870172608545709804976244851391054850231415387973537361,73849855950815996394278522913853784604405917481614187238382106745178216991023997052521433120687596280098328364751220771629394035701614451662263927598541594137065194704725102581132796]
```
