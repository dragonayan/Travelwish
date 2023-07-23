import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Loader from '../../Components/Loader';
import Error from '../../Components/Error';
const Bookings = () => {
    const [bookings, setbookings] = useState([]);
    const [loading, setloading] = useState(false);
    const [error, seterror] = useState(false);
    const [success, setsuccess] = useState(false);
    useEffect(() => {
        const fetchBookings = async () => {
          try {
            setloading(true);
            const response = await axios.get("/api/bookings/getallbookings");
            const data = response.data;
            setbookings(data);
            setloading(false);
          } catch (error) {
            setloading(false);
            seterror(true);
          }
        };
      
        fetchBookings();
      }, []);
      
    return (
        <div className='col-md-11'>
            <h1>Bookings</h1>
            {loading ? (<Loader/>) : error ? (<Error/>) : (<div>

                   <table className='table table-bordered table-dark'>
                       <thead className='bs'>
                           <tr>
                               <th>Booking Id</th>
                               <th>Userid</th>
                               <th>Room</th>
                               <th>From</th>
                               <th>To</th>
                               <th>Status</th>
                           </tr>
                       </thead>
                       <tbody>
                           {bookings.map(booking=>{
                               return <tr>
                                   <td>{booking._id}</td>
                                   <td>{booking.userid}</td>
                                   <td>{booking.room}</td>
                                   <td>{booking.fromdate}</td>
                                   <td>{booking.todate}</td>
                                   <td>{booking.status}</td>
                               </tr>
                           })}
                       </tbody>
                   </table>

            </div>)}
        </div>
    )
}

export default Bookings
