const Admin = require('../models/admin');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config({path: './config/.dev.env'});



const signup = async (req, res) => {
    let user = await Admin.findOne({ email: req.body.email } && { mobile: req.body.mobile });
    if (user && (user.mobile || user.email)) {
        res.status(202).send({
            status: 'Alert',
            statusCode: 202,
            message: 'User available with this email / mobile !',
            data: []
        });
    } else {
        try {
            let passwordSalt = bcrypt.genSaltSync(10);
            let passwordHash = bcrypt.hashSync(req.body.password, passwordSalt);
            const newUser = new Admin ({
                _id: crypto.randomBytes(10).toString("hex"),
                password: passwordHash,
                mobile: req.body.mobile,
                email: req.body.email,
                isActive: true
            });
            const resData = await newUser.save();
            if (resData) {
                res.status(200).send({
                    status: 'Success',
                    statusCode: 200,
                    message: 'User saved successfully !',
                    data: resData
                });
            } else {
                res.status(404).send({
                    status: 'Error',
                    statusCode: 404,
                    message: 'Error while storing data. Try again later !',
                    data: []
                });
            }
        } catch (err) {
            res.status(202).send({
                status: 'Error',
                statusCode: 402,
                message: err.message,
                data: []
            });
        }
    }
}

const login = async (req, res) => {
    let user;
    if (isNaN(parseInt(req.body.username))) {
        // if email
        user = await Admin.findOne({email: req.body.username});
    } else if (!isNaN(parseInt(req.body.username))) {
        // if mobile
        user = await Admin.findOne({mobile: req.body.username});
    }
    if (user && user.isActive) {
        let Pass = req.body.password; 
        let storedPass = user.password; 
        const passwordMatch = await bcrypt.compare(Pass, storedPass);
        if (passwordMatch) {
            const token = jwt.sign(
                { _id: user.uId },
                process.env.JWT_SECRET,
                { expiresIn: "1h" }
              );
              res.status(200).send({
                status: 'Success',
                statusCode: 200,
                message: 'Signin successful !',
                data: {
                    user: user.fullName,
                    jwtToken: token,
                    expiresIn: 24 * 60 * 60,
                    auth: true,
                    uId: user.uId
                }
              });
        } else {
            res.status(409).send({
                status: 'Alert',
                statusCode: 209,
                message: 'Wrong password !',
                data: []
            })
        }
    } else {
        res.status(202).send({
            status: 'Warning',
            statusCode: 202,
            message: 'Username is wrong / doesn`t exist !',
            data: []
        });
    }
}


module.exports = {
    login,
    signup
}