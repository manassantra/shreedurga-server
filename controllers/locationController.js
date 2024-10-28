const LocationConfig = require('../models/locationConfig');
const crypto = require('crypto');



const createLocationDetails = async (req, res) => {
    let location = await LocationConfig.findOne({ locationName: req.body.locationName} || { addressLine1: req.body.addressLine1});
    if (location) {
        res.status(202).send({
            status: 'Alert',
            statusCode: 202,
            message: 'Address already listed as same !',
            data: []
        });
    } else {
        try {
            const loc = new LocationConfig ({
                _id: crypto.randomBytes(10).toString("hex"),
                locationName: req.body.locationName,
                addressLine1: req.body.addressLine1,
                addressLine2: req.body.addressLine2,
                city: req.body.city,
                landmark: req.body.landmark,
                state: req.body.state,
                country: req.body.country,
                pinCode: req.body.pinCode,
                long: req.body.long,
                lat: req.body.lat,
                isActive: true
            });
            const resData = await loc.save();
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
                message: err.name,
                data: err.errors
            });
        }
    }
}

const getAllLocationDetails = async (req, res) => {
    try {
        const locList = await LocationConfig.find();
        if (locList && locList.length > 0) {
            res.status(200).send({
                status: 'Success',
                statusCode: 200,
                message: 'Data fetched successfully !',
                data: locList
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

const getLocationDetailsById = async (req, res) => {
    try {
        let loc = await LocationConfig.findOne({ _id: req.params.id});
        if (loc) {
            res.status(200).send({
                status: 'Success',
                statusCode: 200,
                message: 'Data fetched successfully !',
                data: loc
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

const updateLocationDetails = async (req, res) => {
    let loc = await LocationConfig.findOne({ _id: req.params.id});
    if (loc && loc._id) {
        try {
            await LocationConfig.findOneAndUpdate({id: req.body.id}, req.body, {new: true}).then((resData)=>{
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
            message: 'No data available. Check location Id & try again !',
            data: []
        });
    }
}

const deleteLocationDetails = async (req, res) => {
    try {
        let loc = await LocationConfig.findByIdAndDelete({ _id: req.params.id});
        if (loc) {
            res.status(200).send({
                status: 'Success',
                statusCode: 200,
                message: 'Data deleted successfully !',
                data: loc
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
    createLocationDetails,
    getAllLocationDetails,
    getLocationDetailsById,
    updateLocationDetails,
    deleteLocationDetails
}