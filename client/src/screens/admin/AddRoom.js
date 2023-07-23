import React, { useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
const AddRoom = () => {
  const [room, setRoom] = useState('');
  const [rentperday, setRentPerDay] = useState('');
  const [maxcount, setMaxCount] = useState('');
  const [description, setDescription] = useState('');
  const [phonenumber, setPhoneNumber] = useState('');
  const [type, setType] = useState('');
  const [image1, setImage1] = useState('');
  const [image2, setImage2] = useState('');
  const [image3, setImage3] = useState('');

  async function addRoom() {
    const roomObj = {
      room,
      rentperday,
      maxcount,
      description,
      phonenumber,
      type,
      image1,
      image2,
      image3
    };

    try {
      const result = await axios.post('/api/rooms/addroom', roomObj);
      swal('Congratulations', 'Added Room successfully', 'success')
    } catch (error) {
      // Handle the error
      swal('Error', 'Something Went Wrong', 'failure')
      console.log(error)
    }
  }

  return (
    <div className="row">
      <div className="col-md-5">
        <input
          type="text"
          className="form-control mt-1"
          placeholder="Name"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
        />

        <input
          type="text"
          className="form-control mt-1"
          placeholder="Rent per day"
          value={rentperday}
          onChange={(e) => setRentPerDay(e.target.value)}
        />

        <input
          type="text"
          className="form-control mt-1"
          placeholder="Max count"
          value={maxcount}
          onChange={(e) => setMaxCount(e.target.value)}
        />

        <input
          type="text"
          className="form-control mt-1"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type="text"
          className="form-control mt-1"
          placeholder="Phone number"
          value={phonenumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </div>

      <div className="col-md-6">
        <input
          type="text"
          className="form-control mt-1"
          placeholder="Type"
          value={type}
          onChange={(e) => setType(e.target.value)}
        />
        <input
          type="text"
          className="form-control mt-1"
          placeholder="Image URL 1"
          value={image1}
          onChange={(e) => setImage1(e.target.value)}
        />
        <input
          type="text"
          className="form-control mt-1"
          placeholder="Image URL 2"
          value={image2}
          onChange={(e) => setImage2(e.target.value)}
        />
        <input
          type="text"
          className="form-control mt-1"
          placeholder="Image URL 3"
          value={image3}
          onChange={(e) => setImage3(e.target.value)}
        />
        <div className="mt-1 text-right">
          <button className="btn btn-primary" onClick={addRoom}>
            ADD ROOM
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddRoom;
