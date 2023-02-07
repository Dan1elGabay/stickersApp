const express = require('express');
const { default: mongoose } = require('mongoose');
const router = express.Router();

// this will connect to the database
const connect = require('../data/database');

// import the product model so we can use it in our routes
const {productModel } = require('../model/productModel');



// ====================================== ROUTES ======================================

// Get all items
router.get('/', function(req, res) {
   productModel.find({}, function(err,doc){   // mongoose will actually run this for us:  db.students.find()
      if(err){
        return res.status(500).send(err);
      }
      return res.status(200).json({found: doc});
    })
  });

// ------------------------------------------------------------------------------------

// Get a (single) item by id

router.get('/:id', function(req,res) {
  const id = req.params.id;
 productModel.findById(id, (err,doc) => {
    if(err){
      return res.status(500).json({error: err.message});
    }

    if(!doc){
      console.log(`- couldn't find item with id '${id}'`);
      return res.status(404).json({error: `couldn't find item with id '${id}'`});
    }
    
    return res
    .status(200)
    .json({found: doc})
  })
})

// ------------------------------------------------------------------------------------

// Add an item
router.post('/', function(req,res) {
      // Create a new student model with the values we want
      const newItem = newproductModel ({
        name: req.body.name,
        price: parseInt(req.body.price),
      })

      // Save the new student to the database
      newItem.save().then(() => {
        console.log('+ new item added successfully');
        res
        .status(200)
        .json({
          message: 'successfully added',
          inserted: newItem
        })
    })
})

// ------------------------------------------------------------------------------------



// Update a student
router.put('/:id', function(req,res) {
  const id = req.params.id;
  const data = req.body;

  productModel.findByIdAndUpdate(id, data, {new:true}, (err,doc) => {   // Find a student by id, and update its value with 'data' object

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



module.exports = router;