import React, { useState, useEffect } from "react";
import { Tabs } from "antd";
import axios from "axios";
import Error from "../Components/Error";
import Success from "../Components/Success";
import Loader from "../Components/Loader";
import { Tag, Divider } from "antd";
import Bookings from "./admin/Bookings";
import Rooms from "./admin/Rooms";
import Users from "./admin/Users";
import AddRoom from "./admin/AddRoom";


const { TabPane } = Tabs;
const user = JSON.parse(localStorage.getItem("currentUser"));

function Adminscreen() {
  return (
    <div className="container my-5">
      <div className="card shadow">
        <div className="card-body">
          <h2 className="text-center mb-4">Admin Panel</h2>
          <Tabs defaultActiveKey="1" centered>
            <TabPane tab="Bookings" key="1">
              <div >
                <Bookings/>
              </div>
            </TabPane>
            <TabPane tab="Rooms" key="2">
             <Rooms/>
            </TabPane>
            <TabPane tab="Add Room" key="3">
            <AddRoom/>
            </TabPane>
            <TabPane tab="Users" key="4">
             <Users/>
            </TabPane>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default Adminscreen;
