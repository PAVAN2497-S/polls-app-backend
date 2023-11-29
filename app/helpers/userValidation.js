const User = require('../model/user-model')

const usernameSchema = {
   notEmpty: {
      errorMessage: 'username required'
   }
}

const emailRegisterSchema = {
   notEmpty: {
      errorMessage: 'email requires'
   },
   isEmail: {
      errorMessage: "invalid email format"
   },
   custom: {
      options: async (value) => {
         const user = await User.findOne({ email: value })
         if (!user) {
            return true
         } else {
            throw new Error('email already exists')
         }
      }
   }
}

const emailLoginSchema = {
   notEmpty: {
      errorMessage: 'email not empty'
   },
   isEmail: {
      errorMessage: 'invalid email format'
   }

}
const passwordSchema = {
   notEmpty: {
      errorMessage: 'password required'
   },
   isLength: {
      options: { min: 8, max: 128 },
      errorMessage: 'password  b/w 8-128 characters'
   }
}


const userRegisterValidation = {
   username: usernameSchema,
   email: emailRegisterSchema,
   password: passwordSchema

}  
const userLoginValidation = {
   email: emailLoginSchema,
   password: passwordSchema
}

module.exports = {
   userRegisterValidation,
   userLoginValidation
}
