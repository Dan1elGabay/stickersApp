const mongoose = require('mongoose');

mongoose.set("strictQuery", false);
mongoose.connect('mongodb://localhost:27017', { useNewUrlParser: true, dbName: 'StickerApp',useUnifiedTopology: true })
.then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

