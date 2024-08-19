const User = require('../models/UserModel');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = "MyKey";

const signUp = async (req, res, next) => {
  const { name, email, password } = req.body;
  let existingUser;

  try {
    existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists!" });
    }
  } catch (error) {
    console.log(error);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    name: name,
    email: email,
    password: hashedPassword,
  });

  try {
    await user.save();
    res.status(201).json({
      data: user,
      status: true,
      message: "User created successfully!",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const signIn = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (error) {
    console.log(error.message);
  }

  if (!existingUser) {
    res.status(404).json({ message: "You haven't register yet!" });
  }
  const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);

  if (!isPasswordCorrect) {
    res.status(401).json({ message: "Invalid credentials!" });
  }

  const token = jwt.sign({ id: existingUser._id }, JWT_SECRET_KEY, {
    expiresIn: "3hr",
  });

  res.cookie(String(existingUser._id), token,{
    path : '/',
    expires : new Date(Date.now() + 1000 * 30),
    httpOnly: true,
    sameSite : 'lax'
  })

  res.status(200).json({
    message: "Login successful!",
    data: existingUser,
    token: token,
  });
};

const verifyToken = (req, res, next) => {
 
  const cookies = req.headers["cookie"];  

  if(!cookies){
    res.status(400).json({ message: "Please Login First!" });
    
  }
  console.log("Good token");
  const token = cookies.split("=")[1];

  if (!token) {
    res.status(400).json({ message: "Invalid token" });
  }
 
  

  jwt.verify(String(token), JWT_SECRET_KEY, (err, user) => {
    if(err){
        res.status(403).json({ message: "Unauthorized" });
    }

    req.id = user.id;
  });
  next();
};

const getUser = async (req,res,next) => {

  console.log(req.id);
  
    const userId = req.id;
    let user;

    try{
        user = await User.findById(userId,"-password");
    }catch(err){
        console.log(err);
    }

    if(!user){
        res.status(404).json({ message: "User not found!" });
    }

    return res.status(200).json(user);
}

module.exports = {
  signUp,
  signIn,
  verifyToken,
  getUser
};
