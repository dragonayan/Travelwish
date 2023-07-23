const express = require('express');
const router = express.Router();
const User = require("../models/user")
const bcrypt = require('bcrypt')
router.post("/register", async (req, res) => {
    // destructuring here
    const { name, email, password } = req.body



    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already registered" });
        }
       

        // Create a new user
        const newUser = new User({ name, email, password });
        await newUser.save();

        res.json({ message: "User registered successfully" });
    }
    //for error
    catch (error) {
        return res.status(400).json({ message: error });
    }

});


router.post("/login", async(req, res) => {

    const {email , password} = req.body

    try {
        
        const user = await User.find({email , password})

        if(user.length > 0)
        {
            const currentUser = {
                name : user[0].name , 
                email : user[0].email, 
                isAdmin : user[0].isAdmin, 
                _id : user[0]._id
            }
            res.send(currentUser);
        }
        else{
            return res.status(400).json({ message: 'User Login Failed' });
        }

    } catch (error) {
           return res.status(400).json({ message: 'Something went weong' });
    }
  
});


router.get("/getallusers", async (req, res) => {

    try {
        const users = await User.find({})
        res.send(users)
    } catch (error) {
        return res.status(400).json({ message: error });
    }

});

router.post("/deleteuser", async (req, res) => {

    const userid = req.body.userid

    try {
        await User.findOneAndDelete({ _id: userid })
        res.send('User Deleted Successfully')
    } catch (error) {
        return res.status(400).json({ message: error });
    }

});



module.exports = router