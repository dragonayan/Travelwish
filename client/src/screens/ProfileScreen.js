import React, { useEffect, useState } from 'react'
import { Tabs } from 'antd';
import Loader from '../Components/Loader';
import Error from '../Components/Error';
import { Tag, Divider } from 'antd';
import Swal from "sweetalert2";
import Myorder from '../Components/Myorder';
import Adminscreen from './AdminScreen';
const { TabPane } = Tabs;

const user = JSON.parse(localStorage.getItem('currentUser'))
const ProfileScreen = () => {
   
    return (
      
        <div className="container mt-5">
            {user.isAdmin  && (<Adminscreen/>)}
            <div className="mt-5 ml-3">
                <Tabs defaultActiveKey="1">
                    <TabPane tab="My Profile" key="1">
                        <div className="row">
                            <div className="col-md-6 bs m-2 p-3">
                                <h1><u>Name</u> : {user.name}</h1>
                                <h1><u>Email</u> : {user.email}</h1>
                            <h1><u>User_Id</u> : {user._id}</h1>
                                <h1><u>IsAdmin</u> : {user.isAdmin ? "Yes" : "No"}</h1>
                              
                            </div>
                        </div>
                    </TabPane>
                    <TabPane tab="Bookings" key="2">
                        <h1>
                           <Myorder/>
                        </h1>
                    </TabPane>
                </Tabs>

            </div>

        </div>
    )
}


export default ProfileScreen

