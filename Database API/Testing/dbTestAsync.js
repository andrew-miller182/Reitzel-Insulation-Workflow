var myApi = require('./Database API/apiAsync')

async function run() {
  //All the logic goes inside this run function

  let outputInsert = await myApi.insertValues(
    'Users',
    "null,'sampleuser3@gmail.com','sample','Manager'",
  )

  let outputUpdate = await myApi.updateValues(
    'Users',
    'SecurityLevel = "Admin"',
    'UserID = 10',
  )

  let outputFetch1 = await myApi.fetchValues('Users')

  let outputFetch2 = await myApi.fetchValues('Users', 'Email,SecurityLevel')

  console.log(outputInsert.affectedRows + ' Rows Affected')
  console.log(outputUpdate.affectedRows + ' Rows Affected')
  console.log(outputFetch1)
  console.log(outputFetch2)
}

run()
