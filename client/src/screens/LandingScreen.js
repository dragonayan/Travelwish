import React from "react";
import moment from "moment"
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Link } from "react-router-dom";
import '../App.css'
AOS.init({
    duration:'2000'
});
const Landingscreen=()=> {
  return (
    <div className="">
      <div className="landing row justify-content-center text-center">
        <div className="col-md-9 my-auto" style={{borderRight:'8px solid white'}}>
          <h2 style={{ color: "white", fontSize: "130px" }} data-aos='zoom-in'>Travelwish</h2>
          <h1 style={{ color: "white"}} data-aos='zoom-out' >Go Any where You Wish</h1>
          <Link to="/home">
             <button className='btn btn-primary'>Get Started</button>
          </Link>
        </div>

        
        
      </div>
      <section class='wrapper'>
        <div id="stars"></div>
        <div id="stars2"></div>
        <div id="stars3"></div>
        <div id="title">
            
        </div>
    </section>
    </div>
  );
}

export default Landingscreen;