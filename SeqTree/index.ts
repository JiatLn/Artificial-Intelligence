class SeqTreeNode {
  left: SeqTreeNode | null;
  right: SeqTreeNode | null;
  val: number;
  lazy: number;
  constructor(left: SeqTreeNode | null = null, right: SeqTreeNode | null = null, val: number = 0, lazy: number = 0) {
    this.left = left;
    this.right = right;
    this.val = val;
    this.lazy = lazy;
  }
}

class SegTree {
  root: SeqTreeNode;
  size: number;
  constructor(size: number) {
    this.root = new SeqTreeNode();
    this.size = size
  }
  pushUp(node: SeqTreeNode) {
    node.val = node.left.val + node.right.val
  }
  pushDown(node: SeqTreeNode, start: number, end: number) {
    const mid = (start + end) >> 1;
    if (!node.left) node.left = new SeqTreeNode();
    if (!node.right) node.right = new SeqTreeNode();
    if (node.lazy === 0) return
    node.left.val += node.lazy * (mid - start + 1);
    node.right.val += node.lazy * (end - mid);
    node.left.lazy += node.lazy;
    node.right.lazy += node.lazy;
    node.lazy = 0;
  }
  update(node: SeqTreeNode, start: number, end: number, left: number, right: number, add: number) {
    if (left <= start && end <= right) {
      node.val += add * (end - start + 1);
      node.lazy += add;
      return
    }
    this.pushDown(node, start, end);
    const mid = (start + end) >> 1;
    if (left <= mid) this.update(node.left, start, mid, left, right, add);
    if (right > mid) this.update(node.right, mid + 1, end, left, right, add);
    this.pushUp(node)
  }
  query(node: SeqTreeNode, start: number, end: number, left: number, right: number): number {
    if (left <= start && end <= right) return node.val;
    this.pushDown(node, start, end);
    const mid = (start + end) >> 1;
    let res = 0;
    if (left <= mid) res += this.query(node.left, start, mid, left, right);
    if (right > mid) res += this.query(node.right, mid + 1, end, left, right);
    return res;
  }
}