
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
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

//* === Routes === //
const indexRouter = require('./routes/index'); app.use('/',indexRouter);
const productsRouter = require('./routes/productsRouter'); app.use('/api/products',productsRouter);

//* ===Static Folder: 'Uploads'
//* Note that you don't need to make a separate GET request to the server to fetch the image - the express.static middleware will handle serving the file directly.
const dirname = path.resolve();
app.use('/uploads', express.static(path.join(dirname, '/uploads')));

//* === run the server (on port ****) === //
app.listen(process.env.PORT, () => {
            console.log(`\n =======${new Date().toDateString()}=======`);
            console.log('Server is running on port http://localhost:**** ⚽');})