
const express = require('express');
const app = express()


// Your code goes here
const SubscriberModel = require('./models/subscribers');

app.get( '/subscribers', async ( request, response ) => {
    response.send( await SubscriberModel.find() );
} );

app.get( '/subscribers/names', async ( request, response ) => {
    const fullResults = await SubscriberModel.find().select( {
        _id: false,
        subscribedDate: false,
        __v:false
    } );
    response.send( fullResults );
} );

app.get( '/subscribers/:id', async ( request, response ) => {
    const idTosearch = request.params.id;
    try {
        const doc = await SubscriberModel.findOne( { _id: idTosearch } );
        if( doc == null ) {
            response.status( 400 ).send( { message: "Id not found" } );
        } else {
            response.send( doc );
        }
    } catch( error ) {
        response.status( 400 ).send( { message: error.message } );
    }
} );





















module.exports = app;
