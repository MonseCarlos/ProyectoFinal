const moongose = require('mongoose');
const Schema = moongose.Schema;



let sesion = new Schema ({
    id_user:{
        type: moongose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    id_paquete:{
        type:  moongose.Schema.Types.ObjectId,
        ref: 'paquetes',
        require:true
    },
    date:{
        type:Date,
        default:'2019/01/01'
    },
    cost:{
        type: Number,
        default:0
    },
    status:{
        type:String,
        require:true
    }
})

module.exports = moongose.model('sesion', sesion)

