const Poll = require('../model/poll-model')
const User = require('../model/user-model')
const Category = require('../model/category-model')
const { validationResult } = require('express-validator')
const pollCltr = {}

pollCltr.create = async (req, res) => {
   const errors = validationResult(req)
   if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
   }
   const body = req.body
   //console.log(body)
   try {
      const poll = new Poll(body)
      poll.creator = req.user.id
      await poll.save()
      await User.findOneAndUpdate({ _id: poll.creator }, { $push: { pollsCreated: poll._id } })
      res.json(poll)
   } catch (e) {
      res.json(500).json(e)
   }
}
pollCltr.myPolls = async (req, res) => {
   try {
      const myPolls = await Poll.find({ creator: req.user.id }).populate('categoryId').populate('creator', ['username', '_id'])
      res.json(myPolls)
   } catch (e) {
      res.status(500).json(e)
   }
}

pollCltr.active = async (req, res) => {
   try {
      const polls = await Poll.find({ endDate: { $gte: new Date() } }).populate('categoryId').populate('creator', ['username', '_id'])
      res.json(polls)
   } catch (e) {
      res.status(500).json(e)
   }
}

pollCltr.categories = async (req, res) => {
   const name = req.params.name
   try {
      const category = await Category.findOne({ name: name })
      if (category) {
         const polls = await Poll.find({ categoryId: category._id })
         res.json(polls)
      } else {
         res.status(404).json({ errors: 'category not found' })
      }
   } catch (e) {
      res.status(500).json(e)
   }
}
module.exports = pollCltr