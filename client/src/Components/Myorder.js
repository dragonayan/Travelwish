import React, { useEffect, useState } from 'react'
import { Tabs } from 'antd';
import Loader from '../Components/Loader';
import Error from '../Components/Error';
import { Tag, Divider } from 'antd';
import Swal from "sweetalert2";
import axios from 'axios'
const { TabPane } = Tabs;

const Myorder = () => {
  const user = JSON.parse(localStorage.getItem('currentUser'))
  const [mybookings, setmybookings] = useState([]);
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(false);
  const [success, setsuccess] = useState(false);
  useEffect(() => {
    async function fetchbookings() {
      try {
        setloading(true);
        const data = await (
          await axios.post("/api/bookings/getuserbookings", {
            userid: JSON.parse(localStorage.getItem("currentUser"))._id,
          })
        ).data;
        setmybookings(data);
        setloading(false);
      } catch (error) {
        setloading(false);
        seterror(true);
      }
    }
    fetchbookings()

  }, []);

  async function cancelBooking(bookingid, roomid) {


    try {
      setloading(true);
      const result = await axios.post('/api/bookings/cancelbooking', { bookingid: bookingid, userid: user._id, roomid: roomid });
      setloading(false);
      Swal.fire('Congrats', 'Your Room has cancelled succeessfully', 'success').then(result => {
        window.location.href = '/profile'
      })
    } catch (error) {
      Swal.fire('Oops', 'Something went wrong', 'error').then(result => {
        window.location.href = '/profile'
      })
      setloading(false)
    }

  }

  return (
    <div>
      {loading ? (
        <Loader />
      ) : error ? (
        <Error />
      ) : (
        mybookings.map(booking => {
          return <div className="row">
            <div className="col-md-6 my-auto">
              <div className='bs m-1 p-2'>
                <h1>{booking.room}</h1>
                <p>BookingId : {booking._id}</p>
                <p>TransactionId : {booking.transactionId}</p>
                <p><b>Check In : </b>{booking.fromdate}</p>
                <p><b>Check Out : </b>{booking.todate}</p>
                <p><b>Amount : </b> {booking.totalAmount}</p>
                <p><b>Status</b> : {booking.status == 'booked' ? (<Tag color="green">Confirmed</Tag>) : (<Tag color="red">Cancelled</Tag>)}</p>
                <div className='text-right'>
                  {booking.status == 'booked' && (<button className='btn btn-primary' onClick={() => cancelBooking(booking._id, booking.roomid)}>Cancel Booking</button>)}
                </div>
              </div>
            </div>
          </div>
        })
      )}
    </div>
  );
}

export default Myorder
