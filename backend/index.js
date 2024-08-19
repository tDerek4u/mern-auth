require('dotenv').config();
const express = require('express')
const connectToDatabase = require('./database/connection');
const cookieParser = require('cookie-parser');
const app = express()
const cors = require('cors');
const userRouter = require('./routes/user-routes');
const authRouter = require('./routes/auth');
const port = process.env.PORT || 5000;


connectToDatabase();

app.use(cookieParser());
app.use(express.json());
app.use(cors({credentials : true , origin : "http://localhost:5173"}));

app.get('/yoshika', (req, res) => {
  res.send('Hello World!')
})
app.use('/api/v1', userRouter);
app.use('/api/v1/', authRouter);

app.get('/logout', (req, res) => {
  // Clear the cookie by name
  res.clearCookie('cookieName', {
    path: '/', // Path should match the path used when setting the cookie
    httpOnly: true, // Ensure options match the options used when setting the cookie
    sameSite: 'Lax' // Match the sameSite option if it was set
  });

  // Respond to the client
  res.status(200).json({ message: 'Cookie cleared and logged out' });
});

app.use((err,req,res,next) => {
    res.status(500).json({ code : 500, message : err.message });
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

