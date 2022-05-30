require('dotenv').config({ path: '.env' })
console.log(process.env.HOST) // localhost
console.log(process.env.PORT) // 3000
module.exports = process.env