
require('dotenv').config();

//* require and activate express
const express = require('express');
const app = express();
const path = require('path');

// *console.log(process.env.SERVER_PORT);

// //* static folder
// app.use(express.static('./public/asset'))

//* ===  Cors-handle different GET routes === //
const cors = require('cors');
app.use(cors());
//* === body-parser  === //
const bodyParser = require('body-parser');
//* enable express to parse html FORM data inside the request body
app.use(bodyParser.urlencoded({
    extended: false
}));
//* enable express to parse json data inside the request body
app.use(bodyParser.json());


const multer = require('multer');
 
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});
 
const upload = multer({ storage: storage });

//* === Routes === //
const indexRouter = require('./routes/index'); app.use('/',indexRouter);
const productsRouter = require('./routes/productsRouter'); app.use('/api/products',productsRouter);



//* === run the server (on port 5000) === //
app.listen(5000, () => {
            console.log(`\n =======${new Date().toDateString()}=======`);
            console.log('Server is running on port http://localhost:5000 ⚽');})