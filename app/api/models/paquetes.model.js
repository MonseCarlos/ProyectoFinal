const moongose = require('mongoose');
const Schema = moongose.Schema;


let paquets = new Schema({
    nane:{
        type:String,
        require:true
    },
    cost:{
        type:Number,
        require:true
    },
    status:{
        type:Boolean,
        default:true,
        require:true
    },   
    time:{
        type:String,
        defualt:"",
        require:true
    },
    qphotos:{
        type:Number,
        default:15
    },
    qsizes:{
        type:String,
        default:""
    },
    description:{
        type:String,
        default:""
    }

})

module.exports = moongose.model('paquets',paquets)