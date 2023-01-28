
require('dotenv').config();

//* require and activate express
const express = require('express');
const path = require('path');

const app = express();
// *console.log(process.env.SERVER_PORT);

// //* static folder
// app.use(express.static('./public/asset'))

//* ===  Cors-handle different GET routes === //
const cors = require('cors');
app.use(cors());

const mongoose = require('mongoose');



//* === body-parser  === //
const bodyParser = require('body-parser');
//* enable express to parse html FORM data inside the request body
app.use(bodyParser.urlencoded({
    extended: false
}));
//* enable express to parse json data inside the request body
app.use(bodyParser.json());


//* === Routs === //

const indexRouter = require('./routes/index'); app.use('/',indexRouter);
const invoicesRouter = require('./routes/invoicesRouter'); app.use('/api/invoices',invoicesRouter);
const itemsRouter = require('./routes/itemsRouter'); app.use('/api/items',itemsRouter);


//* === run the server (on port 5000) === //
app.listen(5000, () => {
            console.log(`\n =======${new Date().toDateString()}=======`);
            console.log('Server is running on port http://localhost:5000 ⚽');})