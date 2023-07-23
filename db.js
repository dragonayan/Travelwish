const mongoose = require('mongoose')
const colors=require('colors');
const mongoDBURL = 'mongodb+srv://ayan:Raju%40123@shopit.rqivmr7.mongodb.net/mern-rooms'


mongoose.connect(mongoDBURL, { useUnifiedTopology: true, useNewUrlParser: true })

var dbconnect = mongoose.connection

dbconnect.on('error', () => {
    console.log(`Mongo DB Connection Failed`.red);
})

dbconnect.on('connected', () => {
    console.log(`Mongo DB Connection Successfull`.green);
})


module.exports = mongoose

