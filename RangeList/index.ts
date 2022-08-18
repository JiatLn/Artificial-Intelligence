class RangeList {
  arr: [number, number][]

  constructor() {
    this.arr = []
  }

  add([start, end]: [number, number]) {
    if (start === end)
      return
    for (let i = 0; i < this.arr.length; i++) {
      const [s, e] = this.arr[i]
      if (s <= start && end <= e) { // s--------------------------e
        return                      //    start-------------end
      }                             // ↑--------------------------↑
      if (s <= start && start <= e) { // s-------------e
        this.arr[i] = [s, end]        //     start-----------end
        return                        // ↑--------------------↑
      }
      if (s <= end && end <= e) { //            s-------------e
        this.arr[i] = [start, e]  // start-----------end
        return                    //   ↑---------------------↑
      }
    }
    this.arr.push([start, end])
  }

  remove([start, end]: [number, number]) {
    if (start === end)
      return
    for (let i = 0; i < this.arr.length; i++) {
      const [s, e] = this.arr[i]
      if (start > e || end < s) continue
      if (s <= start && start <= e && end <= e && s <= end) { // s-------------------------e
        this.arr[i] = [s, start]                              //     start-----------end      
        if (s === start) {
          this.arr.splice(i, 1) // remove [s, start] if s === start
        }
        if (end !== e) {
          this.arr.splice(i + 1, 0, [end, e]) // add [end, e] if end !== e
        }
        return
      }
      if (s <= start && start <= e) { // s-------------e
        this.arr[i] = [s, start]      //     start-----------end
      }
      if (s <= end && end <= e) { //            s-------------e
        this.arr[i] = [end, e]    // start-----------end
      }
      if (start <= s && e <= end) {        //       s-------------e
        this.arr.splice(i, 1) // start------------------end
        i--
      }
    }
  }

  print() {
    const res = this.arr.map(item => `[${item[0]}, ${item[1]})`).join(' ')
    console.log(res)
  }
}

// Example run
const rl = new RangeList();
rl.add([1, 5]);
rl.print();
// Should display: [1, 5)
rl.add([10, 20]);
rl.print();
// Should display: [1, 5) [10, 20)
rl.add([20, 20]);
rl.print();
// Should display: [1, 5) [10, 20)
rl.add([20, 21]);
rl.print();
// Should display: [1, 5) [10, 21)
rl.add([2, 4]);
rl.print();
// Should display: [1, 5) [10, 21)
rl.add([3, 8]);
rl.print();
// Should display: [1, 8) [10, 21)
rl.remove([10, 10]);
rl.print();
// Should display: [1, 8) [10, 21)
rl.remove([10, 11]);
rl.print();
// Should display: [1, 8) [11, 21)
rl.remove([15, 17]);
rl.print();
// Should display: [1, 8) [11, 15) [17, 21)
rl.remove([3, 19]);
rl.print();
// Should display: [1, 3) [19, 21)