const Category = require("../model/category-model")

const categoryValidation = {
   name: {
      notEmpty: {
         errorMessage: ' category name required'
      },
      custom: {
         options: async (value) => {
            const result = await Category.findOne({ name: { '$regex': value, $options: 'i' } })
            if (!result) {
               return true
            } else {
               throw new Error('category already exists')
            }
         }
      }
   }
}
module.exports = categoryValidation