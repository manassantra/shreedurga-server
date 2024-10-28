const Bookings = require('../models/bookings');
const crypto = require('crypto');


const createBookings = async (req, res) => {
    try {
        const bookings = new Bookings ({
            _id: crypto.randomBytes(10).toString("hex"),
            name: req.body.name,
            email: req.body.email,
            mobile: req.body.mobile,
            originLocation: req.body.originLocation,
            destinationLocation: req.body.destinationLocation,
            carDetails: req.body.carDetails,
            totalDistance: req.body.totalDistance,
            totalPrice: req.body.totalPrice,
            date: Date.now(),
            bookingStatus: "Booked"
        });
        const resData = await bookings.save();
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

const getAllBookingDetails = async (req, res) => {
    try {
        const bookingList = await Bookings.find();
        if (bookingList && bookingList.length > 0) {
            res.status(200).send({
                status: 'Success',
                statusCode: 200,
                message: 'Data fetched successfully !',
                data: bookingList
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

const getBookingDetailsById = async (req, res) => {
    try {
        let booking = await Bookings.findOne({ _id: req.params.id});
        if (booking) {
            res.status(200).send({
                status: 'Success',
                statusCode: 200,
                message: 'Data fetched successfully !',
                data: booking
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

const updateBookingDetails = async (req, res) => {
    let booking = await Bookings.findOne({ _id: req.params.id});
    if (booking && booking._id) {
        try {
            await Bookings.findOneAndUpdate({id: req.body.id}, req.body, {new: true}).then((resData)=>{
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
            message: 'No data available. Check Booking Id & try again !',
            data: []
        });
    }
}

const deleteBookingDetails = async (req, res) => {
    try {
        let bk = await Bookings.findByIdAndDelete({ _id: req.params.id});
        if (bk) {
            res.status(200).send({
                status: 'Success',
                statusCode: 200,
                message: 'Data deleted successfully !',
                data: bk
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
    createBookings,
    getAllBookingDetails,
    getBookingDetailsById,
    updateBookingDetails,
    deleteBookingDetails
}