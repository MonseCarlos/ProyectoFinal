const moongose = require('mongoose');
const bcrypt = require('bcrypt')
const Schema = moongose.Schema;
const saltRounds = 10

let users = new Schema ({
    email:{
        type: String,
        unique: true,
        dropDups:true,
        require:true
    },
    password:{
        type: String,
        require:true
    },
    name:{
        type: String,
        default: ""
    },
    lastname:{
        type: String,
        default: ""
    },
    puser:{
        type: String,
        requiere:true
    },
    phone:{
        type: String,
        default:""
    },
    address:{
        type: String,
        default: ""
    },
    status:{
        type: Boolean,
        default: true,
        require:true
    }

})

users.pre('save',function(next){
    this.password = bcrypt.hashSync(this.password, saltRounds)
    next(); 
  })

  module.exports = moongose.model('Users', users)