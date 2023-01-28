const mongoose = require('mongoose');

mongoose.set("strictQuery", false);
mongoose.connect('mongodb://localhost:27017', { useNewUrlParser: true, dbName: 'Mongoose' },(console.log('DB is Connected'))).catch((err)=> console.log('Connection Failed',err))



// mongoose.
// connect('mongodb://localhost:27017/',{useNewUrlParser: true,dbName:'orders'},).catch((err)=> console.log('Connection Failed',err))