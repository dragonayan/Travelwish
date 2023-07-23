import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../../Components/Loader";
import Error from "../../Components/Error";
import swal from 'sweetalert';

const Rooms = () => {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
  
    useEffect(() => {
      fetchRooms();
    }, []);
  
    const fetchRooms = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/rooms/getallrooms");
        const data = response.data;
        setRooms(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    };
  
    const handleDeleteRoom = async (roomId) => {
      try {
        await axios.delete(`/api/rooms/${roomId}`);
        // Update the state or perform any necessary actions
        swal('Congratulations', 'Room deleted successfully', 'success')
        fetchRooms();
      } catch (error) {
        setError(true);
      }
    };
  
    return (
      <div className="col-md-11">
        <h1>Rooms</h1>
        {loading ? (
          <Loader />
        ) : error ? (
          <Error />
        ) : (
          <div>
            <table className="table table-bordered table-dark">
              <thead className="bs">
                <tr>
                  <th>Room Id</th>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Rent Per day</th>
                  <th>Max Count</th>
                  <th>Phone Number</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {rooms.map((room) => (
                  <tr key={room._id}>
                    <td>{room._id}</td>
                    <td>{room.name}</td>
                    <td>{room.type}</td>
                    <td>{room.rentperday}</td>
                    <td>{room.maxcount}</td>
                    <td>{room.phonenumber}</td>
                    <td>
                      <button
                        onClick={() => handleDeleteRoom(room._id)}
                        className="btn btn-danger"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  };
  
  export default Rooms;
  