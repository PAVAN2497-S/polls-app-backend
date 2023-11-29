const mongoose = require('mongoose')

const configureDB = async () => {
   try {
      // const db = await mongoose.connect('mongodb://127.0.0.1:27017/polling-app')
      const db = await mongoose.connect(`${process.env.DB_URL}/${process.env.DB_NAME}`)
      console.log('conected to db',process.env.DB_NAME)
   } catch (e) {
      console.log('error connected to db')
   }
}
module.exports = configureDB
