const AppConfig = require('../models/appConfig');
const crypto = require('crypto');


const createAppConfig = async (req, res) => {
    let config = await AppConfig.findOne({ appName: req.body.appName});
    if (config) {
        res.status(202).send({
            status: 'Alert',
            statusCode: 202,
            message: 'Already data available with this name !',
            data: []
        });
    } else {
        try {
            const config = new AppConfig ({
                _id: crypto.randomBytes(10).toString("hex"),
                environment: req.body.environment,
                appName: req.body.appName,
                version: req.body.version,
                address: req.body.address,
                contact: req.body.contact,
                email: req.body.email,
                isActive: true
            });
            const resData = await config.save();
            if (resData) {
                res.status(200).send({
                    status: 'Success',
                    statusCode: 200,
                    message: 'Data saved successfully !',
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
            res.status(400).send({
                status: 'Error',
                statusCode: 400,
                message: err.message,
                data: []
            });
        }
    }
}

const getAllAppConfig = async (req, res) => {
    try {
        const configList = await AppConfig.find();
        if (configList && configList.length > 0) {
            res.status(200).send({
                status: 'Success',
                statusCode: 200,
                message: 'Data fetched successfully !',
                data: configList
            });
        } else {
            res.status(404).send({
                status: 'Alert',
                statusCode: 404,
                message: 'No data available !',
                data: []
            });
        }
    } catch (err) {
        res.status(400).send({
            status: 'Error',
            statusCode: 400,
            message: err.message,
            data: []
        });
    }
}

const getAppConfigById = async (req, res) => {
    try {
        let config = await AppConfig.findOne({ _id: req.params.id});
        if (config) {
            res.status(200).send({
                status: 'Success',
                statusCode: 200,
                message: 'Data fetched successfully !',
                data: config
            });
        } else {
            res.status(404).send({
                status: 'Alert',
                statusCode: 404,
                message: 'No data available !',
                data: []
            });
        }
    } catch (err) {
        res.status(400).send({
            status: 'Error',
            statusCode: 400,
            message: err.message,
            data: []
        });
    }
}

const updateAppConfig = async (req, res) => {
    let config = await AppConfig.findOne({ _id: req.params.id});
    if (config && config._id) {
        try {
            await AppConfig.findOneAndUpdate({id: req.body.id}, req.body, {new: true}).then((resData)=>{
                if (resData) {
                    res.status(200).send({
                        status: 'Success',
                        statusCode: 200,
                        message: 'Data updated successfully !',
                        data: resData
                    });
                } else {
                    res.status(404).send({
                        status: 'Error',
                        statusCode: 404,
                        message: 'Error while updating data. Try again later !',
                        data: []
                    });
                }
            });
        } catch (err) {
            res.status(400).send({
                status: 'Error',
                statusCode: 400,
                message: err.message,
                data: []
            });
        }
    } else {
        res.status(404).send({
            status: 'Alert',
            statusCode: 404,
            message: 'No data available. Check config Id & try again !',
            data: []
        });
    }
}

const deleteAppConfig = async (req, res) => {
    try {
        let config = await AppConfig.findByIdAndDelete({ _id: req.params.id});
        if (config) {
            res.status(200).send({
                status: 'Success',
                statusCode: 200,
                message: 'Data deleted successfully !',
                data: config
            });
        } else {
            res.status(404).send({
                status: 'Alert',
                statusCode: 404,
                message: 'No data available !',
                data: []
            });
        }
    } catch (err) {
        res.status(400).send({
            status: 'Error',
            statusCode: 400,
            message: err.message,
            data: []
        });
    }
}


module.exports = {
    createAppConfig,
    getAllAppConfig,
    getAppConfigById,
    updateAppConfig,
    deleteAppConfig
}