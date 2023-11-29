const mongoose = require('mongoose')
const { model, Schema } = mongoose
const categorySchema = new Schema({
   name: String
})
const Category = model('Category', categorySchema)

module.exports = Category