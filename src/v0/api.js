const express = require('express');
const api = express.Router();

const controller_categories = require('./services/categories/service.controller.api');
const controller_business   = require('./services/business/service.controller.api');


api.get('/' , asyncSupport( async ( req , res , next ) => {
    res.status(200).send({
        version: 'v0'
    });
}));


api.get('/categories' , controller_categories.getCategories );

api.get('/categories/business' , controller_business.getBusiness );

api.post('/categories/business/images' , controller_business.businessImages );


module.exports = api;