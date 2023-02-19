const mongoose = require('mongoose');
require('dotenv').config()


mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, dbName: 'StickerApp',useUnifiedTopology: true })
.then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

