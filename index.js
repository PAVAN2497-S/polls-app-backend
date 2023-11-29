require('dotenv').config()
const express = require('express')
const cors = require('cors')
const configureDB = require('./config/db')
const { userRegisterValidation, userLoginValidation } = require('./app/helpers/userValidation')
const { authenticateUser } = require('./app/middlewares/authenticate')
const { checkSchema } = require('express-validator')
const usersCltr = require('./app/controllers/userCltr')
const categoryValidation = require('./app/helpers/categoryValidation')
const categoryCltr = require('./app/controllers/categoryCltr')
const pollvalidation = require('./app/helpers/pollvalidation')
const pollCltr = require('./app/controllers/pollCltr')
const voteValidationSchema = require('./app/helpers/voteValidation')
const votesCltr = require('./app/controllers/voteCltr')
const port = 3090
const app = express()
app.use(express.json())
app.use(cors())
configureDB()

app.post('/auth/register', checkSchema(userRegisterValidation), usersCltr.register)
app.post('/auth/login', checkSchema(userLoginValidation), usersCltr.login)
app.get('/api/users/account', authenticateUser, usersCltr.account)

app.post('/api/categories', authenticateUser, checkSchema(categoryValidation), categoryCltr.create)
app.get('/api/categories', categoryCltr.list)

app.get('/api/polls/active', pollCltr.active)
app.post('/api/polls', authenticateUser, checkSchema(pollvalidation), pollCltr.create)
app.get('/api/polls/mypolls', authenticateUser, pollCltr.myPolls)

app.post('/api/polls/vote/:pollId', authenticateUser, checkSchema(voteValidationSchema), votesCltr.create)
app.get('/api/polls/category/:name', pollCltr.categories)
app.get('/api/votes/myvotes', authenticateUser, votesCltr.myVotes)

app.listen(port, () => {
   console.log('server running on port', port)
})