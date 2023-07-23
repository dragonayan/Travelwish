import React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Box, Image, Text, Link } from 'rebass';

import Loader from '../Components/Loader'
import Error from '../Components/Error'
import moment from 'moment';
// stripe payment integration
import StripeCheckout from 'react-stripe-checkout'
// importing sweet alert
import swal from 'sweetalert';
import axios from 'axios';
const BookingScreen = () => {

    //fetching url details using useParams hook   
    const date = useParams()

    const fromdatee = moment(date.fromdate, 'DD-MM-YYYY')
    const todatee = moment(date.todate, 'DD-MM-YYYY')
    const fromdate = moment(fromdatee._i)
    const todate = moment(todatee._i)

    // const totaldate = moment.duration(todate.diff(fromdate)).asDays()
    const totaldate = todate.diff(fromdate, "days")

    const [totalamount, setTotalamount] = useState()



    const styles = {
        container: {

            backgroundColor: '#e2d1cd ',
            border: '1px solid #ddd',
            borderRadius: '4px',

        },
        heading: {
            fontSize: '24px',
            marginBottom: '10px',
        },
        price: {
            fontWeight: 'bold',
        },
        shadow: {
            boxShadow: ' 5px 10px  #918886 ',
        }
    };
    const { roomid } = useParams()

    const [room, setroom] = useState([]);
    const [error, seterror] = useState()
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        async function fetchroom() {

            const daa = await (await (axios.post('/api/rooms/getroombyid', { roomid }))).data
            await new Promise((resolve) => setTimeout(resolve, 2000));
            setroom(daa)
            setTotalamount(daa.rentperday * (totaldate + 1))
        }
        setLoading(true)
        fetchroom()
        setLoading(false)

    }, [])

    // defining the bookRoom funciton 

    async function tokenHander(token) {
        console.log(token);
        const bookingdetails = {
            token,
            room,
            userid: JSON.parse(localStorage.getItem('currentUser'))._id,
            fromdate,
            todate,
            totaldate,
            totalamount,

        }
        try {
            // sending data to server
            setLoading(true)
            const result = await axios.post('/api/bookings/bookroom', bookingdetails)
            setLoading(false)
            swal('Congratulations', 'Your room booked successfully', 'success').then(result => {
                window.location.href = '/profile'
            });
        } catch (err) {
            console.log(err)
            setLoading(false)
            swal.fire('Oops', 'Something went wrong , please try later', 'error')

        }
    }


    return (
        <div >

            {loading ? (<h1><Loader /></h1>) : error ? (<h1><Error /></h1>) : (<div>


                <Box p={6} display={{ md: 'flex' }} style={styles.container}>
                    <Box flexShrink={2}>
                        <Text ><h1 >{room.name}</h1> </Text>
                        <Image

                            borderRadius='lg'
                            width={{ md: 400 }}

                            height={{ md: 400 }}
                            src={room.imageurls}

                            style={styles.shadow}
                        />
                    </Box>
                    <Box mt={{ base: 6, md: 3 }} ml={{ md: 7 }}>
                        <Text
                            fontWeight='bold'
                            textTransform='uppercase'
                            fontSize='sm'
                            letterSpacing='wide'
                            color='teal.600'
                        >
                            Booking Details
                        </Text>

                        <Text mt={3} color='gray.500'>
                            <h1 style={styles.heading} >Name: {JSON.parse(localStorage.getItem('currentUser')).name}</h1>
                            <p>From Date:{date.fromdate}</p>
                            <p>To Date:{date.todate}</p>
                            <p>Max Count: {room.maxcount}:</p>
                            <p>AMOUNT:</p>
                            <hr />
                            <p>TotalDays:{totaldate + 1}</p>
                            <p style={styles.price} >Rent Per Day:{room.rentperday}</p>
                            <p>Total Amount: {totalamount} </p>


                            {/* stripe integration */}
                            <StripeCheckout
                                amount={totalamount * 100}
                                token={tokenHander}

                                stripeKey='pk_test_51NOPA9SJ7vbMp80LkYyLuUfvAk4BAKMJKwBotYnYbnIdqKrdmh7Q5IhoqGgmjCYEyQ2dxfyz93C6CrDfWXJ0GvYB00rC4MuwOS'
                                currency='INR'>
                                <button type='button' className='btn btn-primary' marginBottom='2vh'> Pay Now</button>
                            </StripeCheckout>

                        </Text>
                    </Box>
                </Box>


            </div>)}
        </div>
    )

}

export default BookingScreen;
