const express = require('express');
const api = express.Router();
const { asyncSupport }      = require('@codedevbrad/serverutils');
const controller_categories = require('./services/categories/service.controller.api');
const controller_business   = require('./services/business/service.controller.api');
const controller_setup      = require('./setup/setup.controller');

// V0 / API 

api.get('/' , asyncSupport( async ( req , res , next ) => {
    res.status(200).send({
        version: '/v0/api'
    });
}));

// get all categories in a-z.
api.get('/categories' , controller_categories.getCategories );

// get business's by each letter.
api.get('/categories/business' , controller_business.getBusiness );

// generate snapshots for each business.
api.post('/categories/business/images' , controller_business.businessImages );

// generate database.
api.get('/setup/generatedb' , controller_setup.setupCategoryDB );

// clean database.
api.get('/setup/cleandb' , controller_setup.cleanDatabase );

module.exports = api;