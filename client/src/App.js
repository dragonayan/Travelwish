import React from "react";
import Navbar from "./Components/Navbar";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomeScreen from "./screens/HomeScreen";
import Name from "./screens/Name";
import BookingScreen from "./screens/BookingScreen";
import Registration from "./screens/Registration";
import LoginScreen from "./screens/LoginScreen";
import ProfileScreen from "./screens/ProfileScreen";
import Adminscreen from "./screens/AdminScreen";
import LandingScreen from "./screens/LandingScreen";
function App() {
  return (
    <div className="App">
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/book/:roomid/:fromdate/:todate" element={<BookingScreen />} />
          <Route path="/home" exact element={<HomeScreen />} />
          <Route path="/register" exact element={<Registration />} />
          <Route path="/login" exact element={<LoginScreen />} />
          <Route path="/profile" element={<ProfileScreen />}/>
          <Route path="/admin" element={<Adminscreen />}/>
          <Route path="/" element={<LandingScreen />}/>
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
