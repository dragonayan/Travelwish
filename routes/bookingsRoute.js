const express = require('express');
const Booking = require('../models/booking');
const router = express.Router();
const moment = require('moment')
const Room = require('../models/room')
const stripe = require('stripe')('sk_test_51NOPA9SJ7vbMp80L240VKOakglb0OMeSxfddjKgJyy70zDkk7rll3u6GYQ8anxPTfuvKjz6LTP7zlb0jxmos9sCI00s5V2dIUF')
const { v4: uuidv4 } = require('uuid');
const booking = require('../models/booking');
// making a new book
router.post('/bookroom', async (req, res) => {
    // destructuring here
    const { room,
        userid,
        fromdate,
        todate,
        totaldate,
        totalamount,
        token } = req.body

        try {
          const customer = await stripe.customers.create({
              email: token.email,
              source: token.id,
          });
  

        const payment = await stripe.paymentIntents.create(
          {
              amount: totalamount * 100,
              currency: "inr",
              customer: customer.id,
              receipt_email: token.email,
              payment_method_types: ['card']
          },
          {
              idempotencyKey: uuidv4(),
          }
      );

        if (payment) {

            const newbooking = new Booking({
                userid: userid,
                room: room.name,
                roomid: room._id,
                totalDays: totaldate,
                fromdate: moment(fromdate).format("DD-MM-YYYY"),
                todate: moment(todate).format("DD-MM-YYYY"),
                totalamount: totalamount,
                transactionId: "1234",
                status: 'booked'
            });
            const booking = await newbooking.save();
            const roomtemp = await Room.findOne({ _id: room._id })
            roomtemp.currentbookings.push({
                bookingid: booking._id,
                fromdate: moment(fromdate).format("DD-MM-YYYY"),
                todate: moment(todate).format("DD-MM-YYYY"),
                userid: userid,
                status: booking.status
            })
            await roomtemp.save()



            res.send("Payment Successful,Room Booked Successfully");

        } else {
            res.send("Payment failed");
        }
    } catch (error) {
        res.send(error)
    }


});
// cancel bookings of the users
router.post("/cancelbooking", async (req, res) => {
    const {bookingid,roomid } = req.body;
    
  
    try {
  
      const bookingitem = await Booking.findOne({_id: bookingid}) 
      bookingitem.status='cancelled'
      await bookingitem.save();
      const room = await Room.findOne({_id:roomid})
      const bookings = room.currentbookings
      const temp=bookings.filter(booking=>booking.bookingid.toString()!==bookingid)
      console.log(temp);
      room.currentbookings=temp;
      await room.save()
  
      res.send('Booking deleted successfully')
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: "something went wrong" });
    }
  });

  // get bookings of the user
  
  router.post("/getuserbookings", async (req, res) => {
    const { userid } = req.body;
    try {
      const bookings = await Booking.find({ userid: userid }).sort({ _id: -1 });
      res.send(bookings);
    } catch (error) {
      return res.status(400).json({ message: "Something went wrong" });
    }
  });
  
  router.get("/getallbookings", async (req, res) => {
    try {
      const bookings = await Booking.find({});
      res.send(bookings);
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  });

module.exports = router