const express = require('express');
const router = express.Router();
const Room = require('../models/room')


router.get("/getallrooms", async (req, res) => {

     try {
          const rooms = await Room.find({})

          res.send(rooms)
          
     } catch (error) {
          return res.status(400).json({ message: error });
     }
});
router.post("/getroombyid", async (req, res) => {
const roomid=req.body.roomid
     try {
          const room = await Room.findOne({_id:roomid})
         
          res.send(room)
          
     } catch (error) {
          return res.status(400).json({ message: error });
     }
});
router.post("/addroom", async(req, res) => {
     const { room , 
        rentperday, maxcount ,description ,phonenumber ,type ,image1 ,image2 ,image3} = req.body
   
        const newroom = new Room({
             name : room,
             rentperday, 
             maxcount , description , phonenumber , type , imageurls:[image1 , image2 ,image3] , currentbookings:[]
        })
        try {
             await newroom.save()
             res.send('New Room Added Successfully')
        } catch (error) {
             return res.status(400).json({ error });
        }
   });
   router.delete('/:id', async (req, res) => {
     try {
       const roomId = req.params.id;
       await Room.findByIdAndRemove(roomId);
       res.status(200).json({ message: 'Room deleted successfully' });
     } catch (error) {
       res.status(500).json({ error: 'An error occurred while deleting the room' });
     }
   });
   


module.exports = router