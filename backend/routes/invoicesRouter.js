const express = require('express');
const { default: mongoose } = require('mongoose');
const router = express.Router();

// this will connect to the database
const connect = require('../data/database');

// import the student model so we can use it in our routes
const invoiceModel = require('../model/invoiceModel');

// ====================================== ROUTES ======================================

// Get all invoices
router.get('/', function(req, res) {
    invoiceModel.find({})
                .populate('items')
                .exec(function(err,doc) {
                  if(err){
                    return res.status(500).send(err);
                  }
                  return res.status(200).json({found: doc});
    })
  });

// ------------------------------------------------------------------------------------

// Get a (single) invoice by id

router.get('/:id', function(req,res) {
  const id = req.params.id;
  invoiceModel.findById(id, (err,doc) => {
    if(err){
      return res.status(500).json({error: err.message});
    }

    if(!doc){
      console.log(`- couldn't find invoice with id '${id}'`);
      return res.status(404).json({error: `couldn't find invoice with id '${id}'`});
    }

    return res
    .status(200)
    .json({found: doc})
  })
})

// ------------------------------------------------------------------------------------

// Add an invoice
router.post('/', function(req,res) {
      // Create a new student model with the values we want
      const newInvoice = new invoiceModel ({
        clientName: req.body.clientName,
        items: [],
      })

      /*
      if(!Array.isArray(req.body.items)) {
        req.body.items = [req.body.items]
      }
      */
      
      req.body.items.forEach(item => {
        newInvoice.items.push(mongoose.Types.ObjectId(item))
      });

      // Save the new student to the database
      newInvoice.save().then(() => {
        console.log('+ new invoice added successfully');
        res
        .status(200)
        .json({
          message: 'successfully added',
          inserted: newInvoice
        })
    })
})

// ------------------------------------------------------------------------------------

/*

// Update a student
router.put('/:id', function(req,res) {
  const id = req.params.id;
  const data = req.body;

  studentModel.findByIdAndUpdate(id, data, {new:true}, (err,doc) => {   // Find a student by id, and update its value with 'data' object

    // Check if there was an error
    if(err){
      console.log(err);
      return res.status(500).json({error: err.message})
    }

    console.log('+ student successfully updated\n', doc);
    return res
    .status(200)
    .json({
      message: 'successfully updated',
      updated: doc
    })

  })
})

// ------------------------------------------------------------------------------------

// Delete a student

router.delete('/:id', function(req,res) {
  const id = req.params.id;
  studentModel.findByIdAndDelete(id, (err,doc) => {
    if(err){
      console.log(err);
      return res.status(500).json({error: err.message});
    }

    if(!doc) {
      console.log(`- error deleting, couldn't find id '${id}'`);
      return res
      .status(404)
      .json({error: `error deleting- id '${id}' not found`});
    }

    console.log('+ student deleted successfully\n', doc);
    return res
    .status(200)
    .json({
      message: 'successfully deleted',
      deleted: doc
    })

  })
})

*/

module.exports = router;