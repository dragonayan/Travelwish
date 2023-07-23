import React, { useState, useEffect } from "react";

import axios from "axios";
import Error from "../Components/Error";
import Loader from "../Components/Loader";
import Success from "../Components/Success";
import Swal from "sweetalert2";

export default function Registerscreen() {
    const [name, setname] = useState("");
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [cpassword, setcpassword] = useState("");
    const [loading, setloading] = useState(false)
    const [error, seterror] = useState(false)
    const [success, setsuccess] = useState(false)
    
     const register = async ()=> {

        if (password !== cpassword) {
            alert("passwords not matched")
        }
        else {
            const user = {
                name,
                email,
                password
            }

            try {
                setloading(true)
                const result = await axios.post('/api/users/register', user)
                setloading(false)
                setsuccess(true)
                setemail('')
                setname('')
                setcpassword('')
                setpassword('')
                Swal.fire('Congrats' , 'Registration done succeessfully' , 'success').then(result=>{
                    window.location.href='/login'
                })
            } catch (error) {
                seterror(true)
                setloading(false)
                console.log(error);
            }

        }

    }

    return (
        <div className='register'>
            <div className="row justify-content-center mt-5">
                <div className="col-md-5 mt-5 text-left shadow-lg p-3 mb-5 bg-white rounded">

                    {loading && (<Loader />)}
                    {success && (<Success success='User Registered Successfully' />)}
                    {error && (<Error error='Email already registred' />)}

                    <h2 className="text-center m-2" style={{ fontSize: "35px" }}>
                        Register
                    </h2>
                    <div>
                        <input required type="text" placeholder="name" className="form-control mt-1" value={name} onChange={(e) => { setname(e.target.value) }} />
                        <input required type="text" placeholder="email" className="form-control mt-1" value={email} onChange={(e) => { setemail(e.target.value) }} />
                        <input
                            type="text"
                            placeholder="password"
                            className="form-control mt-1"
                            value={password}
                            required
                            onChange={(e) => { setpassword(e.target.value) }}
                        />
                        <input
                            type="text"
                            placeholder="confirm password"
                            className="form-control mt-1"
                            value={cpassword}
                            required
                            onChange={(e) => { setcpassword(e.target.value) }}
                        />
                        <button onClick={register} className="btn btn-primary rounded-pill mt-3 mb-3">REGISTER</button>
                        <br />
                        <a style={{ color: 'black' }} href="/login">Click Here To Login</a>
                    </div>
                </div>
            </div>
        </div>
    );
}