const express = require('express');
const locationApi = express();
const verifyAuthKey = require('../middlewares/verifyAuthKey');

const { 
        createLocationDetails,
        getAllLocationDetails,
        getLocationDetailsById,
        updateLocationDetails,
        deleteLocationDetails
                              } = require('../controllers/locationController');


locationApi.post('/create', verifyAuthKey, createLocationDetails);
locationApi.get('/all', getAllLocationDetails);
locationApi.get('/:id', getLocationDetailsById);
locationApi.put('/update/:id', verifyAuthKey, updateLocationDetails);
locationApi.delete('/delete/:id', verifyAuthKey, deleteLocationDetails);



module.exports = locationApi;