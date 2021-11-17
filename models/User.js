const moongose=require('mongoose')
const bcrypt=require('bcrypt')

const Schema=moongose.Schema

const UserSchema = new Schema({
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
        type:String,
        required: true
    },
    role:{
      type:String,
      enum:["customer","trainer","admin"],
      default:"customer"
    }
  });

  UserSchema.pre("save",function (next) {
    const user=this
    bcrypt.hash(user.password,10,(error,hash)=>{
        user.password=hash
        next()
    })
})

  const User=moongose.model('User',UserSchema)
  module.exports=User