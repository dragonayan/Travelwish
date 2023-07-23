import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios';
import Room from '../Components/Room';
import Loader from '../Components/Loader';
import Error from '../Components/Error';


import { DatePicker } from 'antd';
import moment from 'moment'
const { RangePicker } = DatePicker;

const HomeScreen = () => {
  const [hotels, sethotels] = useState([])
  const [error, seterror] = useState()
  // pass the from and to date to the booking screen
  const [fromdate, setfromdate] = useState(null)
  const [todate, settodate] = useState(null)
  const [duplicatehotels, setduplicatehotels] = useState([])
  const [searchkey, setsearchkey] = useState('')
  const [type, settype] = useState('all')


  const [loading, setLoading] = useState(false)
  useEffect(() => {
    async function fetchRooms() {
      try {
        setLoading(true);
        const response = await axios.get('/api/rooms/getallrooms');

        // Introduce an artificial delay using setTimeout
        await new Promise((resolve) => setTimeout(resolve, 1000));

        sethotels(response.data);
        setduplicatehotels(response.data)
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    }

    fetchRooms();
  }, []);
  function filterBySearch() {
    const dupdate = duplicatehotels.filter(room => room.name.toLowerCase().includes(searchkey))
    sethotels(dupdate)
  }

  function filterByType(e) {
    settype(e)
    if (e !== 'all') {
      const dupdate = duplicatehotels.filter(room => room.type.toLowerCase() == e.toLowerCase())
      sethotels(dupdate)
    }
    else {
      sethotels(duplicatehotels)
    }

  }


  function filterByDate(dates) {
    const dateStr = dates[0].$d;
    const todateStr = dates[1].$d;
    const formattedDate = moment(dateStr).format("DD-MMM-YYYY");
    const toformattedDate = moment(todateStr).format("DD-MMM-YYYY");


    console.log(formattedDate)
    console.log(toformattedDate)
    setfromdate(formattedDate)
    settodate(toformattedDate)

    const filteredHotels = duplicatehotels.filter(room => {
      let isAvailable = true;

      for (let booking of room.currentbookings) {
        const bookingFromDate = moment(booking.fromdate, 'DD-MM-YYYY');
        const bookingToDate = moment(booking.todate, 'DD-MM-YYYY');

        const overlaps =
          moment(dates[0].$d).isBetween(bookingFromDate, bookingToDate, undefined, '[]') ||
          moment(dates[1].$d).isBetween(bookingFromDate, bookingToDate, undefined, '[]') ||
          moment(booking.fromdate).isBetween(moment(dates[0].$d), moment(dates[1].$d), undefined, '[]') ||
          moment(booking.todate).isBetween(moment(dates[0].$d), moment(dates[1].$d), undefined, '[]');

        if (overlaps) {
          isAvailable = false;
          break;
        }
      }

      return isAvailable;
    });

    sethotels(filteredHotels);

  }


  return (
    <div className='container '>
      <div className='row mt-5'>
        <div className='col-md-4'>
          <RangePicker style={{ height: "38px" }} format="DD-MM-YYYY" onChange={filterByDate} className='m-2' />
        </div>
        <div className="col-md-4">
          <input
            type="text"
            className="form-control i2 m-2"
            placeholder='Search place'
            value={searchkey}
            onKeyUp={filterBySearch}
            onChange={(e) => { setsearchkey(e.target.value) }}
          />
        </div>
        <div className="col-md-4">
          <select className="form-control m-1" value={type} onChange={(e) => { filterByType(e.target.value) }} >

            <option value="all">All</option>
            <option value="delux">Delux</option>
            <option value="non-delux">Non Delux</option>

          </select>
        </div>


      </div>

      <div className='row justify-content  center mt-5'>
        {loading ? (<h1><Loader /></h1>) : error ? (<h1><Error /></h1>) : hotels.map((x) => {
          return <div className='com-md-9' >
            <Room room={x} fromdate={fromdate} todate={todate}  />
            {/* //x is nothing but an iterator */}
          </div>
        })}
      </div>  

    </div >
  )
}

export default HomeScreen
