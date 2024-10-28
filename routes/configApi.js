const express = require('express');
const configApi = express();
const {     
        createAppConfig,
        getAllAppConfig,
        getAppConfigById,
        updateAppConfig,
        deleteAppConfig
                        } = require('../controllers/appConfigController');
const verifyAuthKey = require('../middlewares/verifyAuthKey');
                      


configApi.post('/create', verifyAuthKey, createAppConfig);
configApi.get('/all', getAllAppConfig);
configApi.get('/:id', getAppConfigById);
configApi.put('/update/:id', verifyAuthKey, updateAppConfig);
configApi.delete('/delete/:id', verifyAuthKey, deleteAppConfig);


module.exports = configApi;