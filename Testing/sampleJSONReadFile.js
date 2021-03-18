const ajax = require('./sampleBase')
const CircularJSON = require('circular-json')

async function run() {
  let htmlFile = await ajax.ajax('/', '', 'post')
  let stringHtmlFile = CircularJSON.stringify(htmlFile)
  console.log(stringHtmlFile)
}

run()
