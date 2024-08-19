require("dotenv").config();
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const connectToDatabase = () => {
    mongoose.connect(process.env.DB_CONNECTION)
      .then(() => {
        console.log('Database Connected!');
      })
      .catch((err) => {
        console.error('Database connection error:', err);
      });
  };

module.exports = connectToDatabase;