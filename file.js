const fs = require('fs')
fs.readFile('input.txt', function(err, data) {
  if (err) {
    return console.error(err)
    return
  }
  console.log("异步读取：" + data.toString())
})

console.log('同步读取')
let data = fs.readFileSync('input.txt')
console.log("同步读取：" + data.toString())
fs.appendFile('input.txt', 'new contenr ', function(err) {
  if (err) {
    return console.error(err)
  }
  console.log('数据写入成功！')
  console.log("--------我是分割线-------------")
  console.log("读取写入的数据！")
  fs.readFile('input.txt', function(err, data) {
    if (err) {
      return console.error(err)
    }
    console.log('异步读取的新数据为：', data.toString())
  })
})
