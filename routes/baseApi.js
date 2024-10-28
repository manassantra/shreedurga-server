const express = require('express');
const baseApi = express();
const configApi = require('../routes/configApi');
const authApi = require('./authApi');
const locationApi = require('./locationApi');
const bookingApi = require('./bookingApi');
const verifyApiKey = require('../middlewares/verifyApiKey');

baseApi.use('/check-server', (req, res)=>{
    try {
        res.status(200).send({
            code: 200,
            status: 'OK',
            message: 'Sever Running'
        });
    } catch (err) {
        res.status(500).send({
            code: 500,
            status: 'Error',
            message: err.message
        });
    }
});

baseApi.use('/config', verifyApiKey, configApi);
baseApi.use('/admin/auth', verifyApiKey, authApi);
baseApi.use('/location', verifyApiKey, locationApi);
baseApi.use('/booking', verifyApiKey, bookingApi);


module.exports = baseApi;