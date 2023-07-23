const mongoose = require("mongoose");

const bookingSchema = mongoose.Schema({
    room: { type: String, },
    roomid: { type: String, },
    userid: { type: String, },
    fromdate: { type: String},
    todate: { type: String },
    totalDays: { type: Number},
    totalAmount: { type: Number },
    transactionId: { type: String },
    status: { type: String, default: 'booked' },
}, {
    timestamps: true,
})

module.exports = mongoose.model('bookings', bookingSchema)

//don't include required :true here