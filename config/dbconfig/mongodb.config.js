require('dotenv').config()
const mongoose = require('mongoose');
const config = require('config');
const db = "mongodb+srv://emandate:a@Gm4AWPxUxAm74@nupay-emandate.9zsm6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";	
// const db = "mongodb://localhost:27017/emandate";	

const connectDB = async () => {
  try {
    await mongoose.connect(
      db,
      {
        useNewUrlParser: true,
        seUnifiedTopology: true,	
        useUnifiedTopology: true 
      }
    );

    console.log('MongoDB is Connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};




module.exports = connectDB;