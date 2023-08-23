// 可以引⼊的库和版本相关请参考 “环境说明”
// 请通过输出方法打印代码运行结果，“运行”后在控制台查看输出信息
// function main（）入口函数请勿修改，以防执行失败

function chineseNumber(num: number): string {
  // show me your code
  if (+num === 0) return '零'
  const nums = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']
  const units = ['', '十', '百', '千', '万', '十', '百', '千', '亿', '十', '百', '千', '万', '十', '百', '千', '亿']
  let result = ''
  let arr = String(num).split('').map(item => +item)
  for (let i = 0; i < arr.length; i++) {
    let digit = arr[i]
    let unit = units[arr.length - 1 - i]
    result += nums[digit] + unit
  }
  result = result.replace(/零[千,百,十,零]+/g, '零')
  result = result.replace(/亿零万/g, '亿零')
  result = result.replace(/零万/g, '万')
  result = result.replace(/零亿/g, '亿')
  result = result.replace(/零零+/g, '零')
  // 过滤开头结尾
  result = result.replace(/零$/, '')
  result = result.replace(/^零/, '')
  result = result.replace(/^一十/g, '十')
  return result
}

function main2() {
  const cases = new Map([
    [1234_5678_9098_7654, "一千二百三十四万五千六百七十八亿九千零九十八万七千六百五十四"],
    [1000_0000_0000_0002, "一千万亿零二"],
    [100, "一百"],
    [10, "十"],
  ])
  for (const [key, value] of cases.entries()) {
    const str = chineseNumber(key)
    if (value != str) {
      throw new Error("expected value for " + key + " was " + value + ", but got " + str)
    }
  }
  console.log("PASSED!")
}

main2()
