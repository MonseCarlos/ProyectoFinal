const paquetesModel = require('../models/paquetes.model')
const jwt = require('jsonwebtoken')

const getPaq = (req,res) => {
    paquetesModel.find( function(err,data){
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
    const newPaq = new paquetesModel(req.body);
    newPaq.save().then((data) => {
        res.status(200).json({
            success: true,
            message: data
        })
    }).catch((err) => {
        res.status(500).json({
            success: false,
            message: 'Cannot Register this paquetes now, try another one' + err
        })
    })
}

const deletes = (req,res, next) =>{
    paquetesModel.findOne({_id: req.body._id}, function (err, paqData){
        if(!paqData){
            const error ={
                sucess: false,
                message: "paquete is not found"
            }
            res.status(401).json(error)
        }else{
            paqData.status = false
            paqData.save().then (user =>{
                res.status(200).json({
                    sucess: true,
                    message: 'paquete delete'
                })
            })
        }
    }).catch(err => {
        res.status (500).json({
            sucess:false,
            message:"delete is not posible"
        })
    })

}

const active = (req,res, next) =>{
    paquetesModel.findOne({_id: req.body._id}, function (err, paqData){
        if(!paqData){
            const error ={
                sucess: false,
                message: "paquete is not found"
            }
            res.status(401).json(error)
        }else{
            paqData.status = true
            paqData.save().then (user =>{
                res.status(200).json({
                    sucess: true,
                    message: 'paquete activo'
                })
            })
        }
    }).catch(err => {
        res.status (500).json({
            sucess:false,
            message:"delete is not posible"
        })
    })

}
const update = (req,res, next) =>{
    paquetesModel.findOne({_id: req.body._id}, function (err, paqData){
        if(!paqData){
            const error ={
                sucess: false,
                message: "paquete is not found"
            }
            res.status(401).json(error)
        }else{
            paqData.name = req.body.name
            paqData.cost = req.body.cost
            paqData.time = req.body.time
            paqData.qphotos = req.body.qphotos
            paqData.qzizes = req.body.qzizes
            paqData.description = req.body.description
            paqData.save().then (user =>{
                res.status(200).json({
                    sucess: true,
                    message: 'paquete update'
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

module.exports ={
    add,
    deletes,
    update,
    getPaq,
    active
}