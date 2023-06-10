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

