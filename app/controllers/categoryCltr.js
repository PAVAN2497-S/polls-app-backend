const Category = require('../model/category-model')
const { validationResult } = require('express-validator')
const categoryCltr = {}

categoryCltr.create = async (req, res) => {
   const errors = validationResult(req)
   if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
   }
   const body = req.body
   const category = new Category(body)
   try {
      await category.save()
      res.json(category)
   } catch (e) {
      res.status(500).json(e)
   }
}
categoryCltr.list = async (req, res) => {
   try {
      const categories = await Category.find()
      res.json(categories)
   } catch (e) {
      res.status(500).json(e)
   }
}

module.exports = categoryCltr