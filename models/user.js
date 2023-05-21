const { Schema, model } = require('mongoose')
const { handleMongooseError } = require('../helpers')

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      minlength: 4,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
)

userSchema.post('save', handleMongooseError)

const User = model('user', userSchema)

module.exports = User
