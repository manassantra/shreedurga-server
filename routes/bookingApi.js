const express = require('express');
const bookingApi = express();
const {     
        createBookings,
        getAllBookingDetails,
        getBookingDetailsById,
        updateBookingDetails,
        deleteBookingDetails
                                } = require('../controllers/bookingController');
const verifyAuthKey = require('../middlewares/verifyAuthKey');
                      


bookingApi.post('/create', createBookings);
bookingApi.get('/all', verifyAuthKey, getAllBookingDetails);
bookingApi.get('/:id', getBookingDetailsById);
bookingApi.put('/update/:id', verifyAuthKey, updateBookingDetails);
bookingApi.delete('/delete/:id', verifyAuthKey, deleteBookingDetails);


module.exports = bookingApi;