const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const tokenjwt = 'myword'


const add = (req, res, next) => {
    const newUser = new userModel(req.body);
    newUser.save().then((data) => {
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
    userModel.findOne({_id: req.body._id}, function (err, userData){
        if(!userData){
            const error ={
                sucess: false,
                message: "user is not found"
            }
            res.status(401).json(error)
        }else{
            userData.status = false
            userData.save().then (user =>{
                res.status(200).json({
                    sucess: true,
                    message: 'user delete'
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
    userModel.findOne({_id: req.body._id}, function (err, userData){
        if(!userData){
            const error ={
                sucess: false,
                message: "user is not found"
            }
            res.status(401).json(error)
        }else{
            userData.name = req.body.name
            userData.password = req.body.password
            userData.lastname = req.body.lastname
            userData.phone = req.body.phone
            userData.address = req.body.address
            userData.save().then (user =>{
                res.status(200).json({
                    sucess: true,
                    message: 'user update'
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


const login = (req, res, next) => {
    const user = {
        email: req.body.email,
        password: req.body.password
    };
    userModel.findOne({ email: user.email }, function (err, userData) {
        if (err) {
            const error = {
                success: false,
                error: err
            };
            res.status(404).json(error);
        } else {
            if (userData != null && bcrypt.compareSync(req.body.password, userData.password)) {
                const token = jwt.sign({ user }, 'myword', function (err, token) {
                    if (!err) {
                        res.status(200).json({
                            success: true,
                            //username: userData,
                            token: token,
                            active: userData.active,
                        })
                    } else {
                        res.status(500).json({
                            success: false,
                            error: err
                        })
                    }
                })
            } else {
                //console.log(userModel)
                //console.log(req.body.password)
                //console.log( userData.password)
                res.status(401).json({
                    success: false,
                    message: 'Incorrect Password'
                })
            }
        }
    })
}

module.exports = {
    add,
    deletes,
    update,
    login
}

