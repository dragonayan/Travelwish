const express = require('express');
const app = express();
const dbconfig = require('./db')
const roomsRoute = require('./routes/roomsRoute')
const usersRoute = require('./routes/userRoute')
const bookingsRoute = require('./routes/bookingsRoute')
app.use(express.json())
app.use('/api/rooms', roomsRoute)
app.use('/api/users', usersRoute)
app.use('/api/bookings', bookingsRoute)


const port = 4000;
app.listen(port, () => {
    console.log(`Server runing at ${port} `)
})