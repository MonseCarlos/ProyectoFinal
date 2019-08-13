const sesionModel = require('../models/sesion.model');
const jwt = require('jsonwebtoken');


const getSesion = (req,res)=>{
    sesionModel.find( {id_user: req.body.id_user},function(err,data){
        if(err){
            const error = {
                sucess: false,
                message: err
            };
            res.status(402).json(error);
        }else{
            res.status(200).json({
                sucess: true,
                message: data
            })
        }
    })
        
}

const add = (req, res, next) => {
    const newSesion = new sesionModel(req.body);
    newSesion.save().then((data) => {
        res.status(200).json({
            success: true,
            message: data
        })
    }).catch((err) => {
        res.status(500).json({
            success: false,
            message: 'Cannot Register this user now, try another one' + err
        })
    })
}

const deletes = (req,res, next) =>{
    jwt.verify(req.token, 'myword', (err, authData) => {
        if (err) {
            //error with JWT
            const error = {
                success: false,
                message: err
            }
            res.status(401).json(error)
        } else {
            //erase data from data base
            let id = req.body._id
            sesionModel.deleteOne({ _id: id }, (err, response) => {
                if (err || response.deletedCount == 0) {
                    // return error from database
                    res.status(404).json({
                        success: false,
                        message: err,
                        count: response.deletedCount
                    })
                } else {
                    res.status(200).json({
                        success: true,
                        message: 'Deleted successfully!',
                        res: response
                    })
                }
            })
        }
    })
}

const update = (req,res, next) =>{
    sesionModel.findOne({_id: req.body._id}, function (err, sesionData){
        if(!sesionData){
            const error ={
                sucess: false,
                message: "sesion is not found"
            }
            res.status(401).json(error)
        }else{
            sesionData.id_paquete = req.body.id_paquete
            sesionData.date = req.body.date
            sesionData.save().then (sesion =>{
                res.status(200).json({
                    sucess: true,
                    message: 'sesion update'
                })
            })
        }
    }).catch(err => {
        res.status (500).json({
            sucess:false,
            message:"update is not posible"
        })
    })

}


module.exports = {
    add,
    update,
    deletes,
    getSesion
}