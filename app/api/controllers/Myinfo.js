const MyinfoModel = require ('../models/user.model')
const jwt = require('jsonwebtoken')

const getInfo = (req,res) => {

    MyinfoModel.findOne({_id: req.body._id}, function(err,data){
        if(err){
            const error = {
                sucess: false,
                message: err
            };
            res.status(402).json(error);
        }else{
            res.status(200).json({
                sucess: true,
                name: data.name,
                status: data.active,
                email: data.email,
                address: data.address,
                phone: data.phone
            })
        }
    })
    
}

module.exports = { getInfo }