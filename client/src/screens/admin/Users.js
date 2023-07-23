import React, { useEffect } from 'react'
import Loader from '../../Components/Loader';
import { useState } from 'react';
import axios from 'axios';
import Error from '../../Components/Error';
const deleteRoom = async (roomId) => {
  try {
    await axios.delete(`/api/rooms/delete/${roomId}`);
    // Update the state or perform any necessary actions after successful deletion
  } catch (error) {
    console.log(error);
    // Handle the error
  }
};

const Users = () => {
    const[users , setUsers] = useState()
  const[loading , setLoading] = useState(true)
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/users/getallusers");
        const data = response.data;
        setUsers(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
        
      }
    };

    fetchUsers();
  }, []);
  return(
    <div className='row'>
          {loading && (<Loader/>)}

       <div className="col-md-10">
       <table className='table table-bordered table-dark'>
           <thead className='bs'>
             <tr>
               <th>Id</th>
               <th>Name</th>
               <th>Email</th>
               <th>isAdmin</th>
             </tr>
           </thead>
         
         <tbody>

        

          {users && (users.map(user=>{
            return <tr>
              <td>{user._id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.isAdmin ? 'YES' : 'NO'}</td>
            </tr>
          }))}
           </tbody>
          </table>
       </div>
    </div>
  )
}

export default Users
