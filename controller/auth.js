const User = require("../models/users");
const UserModel = require("../models/users")
const {userType} = require("../util/enum");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Create and Save a new user
exports.registerWorker = async (req, res) => {
    // const id = req.payload.id;
    console.log("reach here");
    if (!req.body.email && !req.body.firstName && !req.body.lastName && !req.body.phone && !req.body.password) {
        res.status(400).send({ message: "Content can not be empty!" });
    }

    
    const { department, email, password, firstName, lastName, address, occupation, phone } = req.body;
    const emailExists = await User.findOne({ email: email });
    if (emailExists) return res.status(400).send("Email allready exists");

    const hashed_password = await bcrypt.hash(password, 10);
    
    const user = new UserModel({
        email: email,
        firstName: firstName,
        lastName: lastName,
        phone: phone,
        department: department,
        address: address,
        occupation: occupation,
        userType: userType.WORKER.value,
        password: hashed_password,
    });

    
    console.log(req.body);
    await user.save().then(data => {
        res.send({
            message:"Worker created successfully!!",
            user:data
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating user"
        });
    });
};

exports.registerAdmin = async (req, res) => {
    console.log("reach here");
    console.log(req.body);
    if (!req.body.email && !req.body.firstName && !req.body.lastName && !req.body.phone && !req.body.password) {
        res.status(400).send({ message: "Content can not be empty!" });
    }

    
    const { department, email, password, firstName, lastName, address, occupation, phone } = req.body;
    if(!email || !password || !phone) return res.status(400).send("All required field must be passed");
    
    
    const emailExists = await User.findOne({ email: email });
    if (emailExists) return res.status(400).send("Email allready exists");

    console.log("password", password);
    const salt = await bcrypt.genSalt(10);  
    const hashPassword = await bcrypt.hash(password, salt);

    // const hashed_password = await bcrypt.hash(password, 10);
    
    const user = new UserModel({
        email: email,
        firstName: firstName,
        lastName: lastName,
        phone: phone,
        department: department,
        address: address,
        occupation: occupation,
        userType: userType.ADMIN.value,
        password: hashPassword
    });

    
    console.log(req.body);
    await user.save().then(data => {
        res.send({
            message:"Admin account created successfully!!",
            user:data
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating user"
        });
    });
};


exports.loginUser = async (req, res, next) => {
    const { email, password } = req.body;
    if(!email || !password) return res.status(400).send("All required field must be passed");

    const user = await UserModel.find({email: email});
    if(!user) {
    res.status(404).send({ message: "User not found!" });
    }

    
    // Compare the plain text password with hashed password in the DB
    console.log("password", password);
    console.log("hashpassword",user[0].password);
    const isPassword = await bcrypt.compare(password, user[0].password);
    if(!isPassword) {
        res.status(401).send({ message: "Invalid password!" });
    }

    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
    res.header("auth-token", token).send(token);

      
  };