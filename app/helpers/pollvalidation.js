const pollvalidation = {
   question: {
      notEmpty: {
         errorMessage: 'question should not be empty'
      }
   },
   createdDate: {
      isDate: {
         format: 'YYY-MM-DD',
         errorMessage: 'date should be valid'
      },
      custom: {
         
         options: (value) => {
            const today = new Date()
            const year = today.getFullYear(),month= today.getMonth()+1,day=today.getDate()
            if (new Date(value) < new Date(`${year}-${month}-${day}`)) {
               throw new Error('created date cannot be yesterday')
            } else {
               return true
            }
         }
      }
   },
   options: {
      isArray: {
         options: { min: 2 },
         errorMessage: 'minimum 2 options required'
      },
      custom: {
         options: (value) => {
            const result = value.every((ele) => {
               return ele.optionText.trim().length > 0
            })
            if (!result) {
               throw new Error('options cannot be empty')
            } else {
               return true
            }
         }
      }
   },
   endDate: {
      isDate: {
         errorMessage: 'date should be valid',
         format: "YYYY-MM-DD"
      },
      custom: {
         options: async (value, { req }) => {
            if (new Date(value) < new Date(req.body.createdDate)) {
               throw new Error('poll end date should not be less createdDate')
            } else {
               return true
            }
         }
      }
   },
   categoryId: {
      isMongoId: {
         errorMessage: 'should be valid id'
      }
   }

}

module.exports = pollvalidation