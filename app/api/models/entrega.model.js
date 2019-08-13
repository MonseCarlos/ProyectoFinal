const mongoose = require('mongoose')
const Schema = mongoose.Schema

let entrega = new Schema({
    id_sesion:{
        type: moongose.Schema.Types.ObjectId,
        ref: 'sesiones',
        require:true
    },
    urlphoto:{
        type:String,
        require:true
    },
    status:{
        type:Boolean,
        default:false
    }
})

module.exports = mongoose.model('entrega',entrega)