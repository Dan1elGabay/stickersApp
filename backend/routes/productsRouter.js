const express = require("express");
// The express.Router middleware as it allows us to group the route handlers for a particular part of a site together and access them using a common route-prefix.
const router = express.Router();

//* NodeJS modules
const fs = require("fs");
const path = require("path");

// this will connect to the database
const connect = require("../data/database");
const { default: mongoose } = require("mongoose");

// import the product model so we can use it in our routes
const { productModel } = require("../model/productModel");
// allow to using the server upload files/images
const multer = require("multer");
const {storage,upload} = require('../multer/multer')


// ====================================== ROUTES ======================================
// Update some of product values
router.patch("/:id", upload.single("image"), async function (req, res) {
  const id = req.params.id;
  const { imagePath } = req.body;
  const data = req.body;
  
  productModel.findByIdAndUpdate(
    id,
    { ...data, imagePath: req.file.path.replace("\\","/") },
    { new: true },
    (err, doc) => {
      // Check if there was an error
      if (err) {
        console.log(err);
        return res.status(500).json({ error: err.message });
      }

      console.log("+ Product successfully updated", doc);

      return res.status(200).json({
        message: "Successfully updated",
        updated: doc,
      });
    }
  );
});

// ------------------------------------------------------------------------------------
// Get all items
router.get("/", function (req, res) {
  productModel.find({}, function (err, doc) {
    if (err) {
      return res.status(500).send(err);
    }
    return res.status(200).json({ found: doc });
  });
});

// ------------------------------------------------------------------------------------

// Get a (single) Product by id
router.get("/:id", function (req, res) {
  const id = req.params.id;
  productModel.findById(id, (err, doc) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (!doc) {
      console.log(`- Couldn't find item with id '${id}'`);
      return res
        .status(404)
        .json({ error: `Couldn't find item with id '${id}'` });
    }

    return res.status(200).json({ found: doc });
  });
});

// ------------------------------------------------------------------------------------

// Add a Product
router.post("/", upload.single("image"), function (req, res) {
  

  const newProduct = new productModel({
    cn_s2p: req.body.cn_s2p,
    description: req.body.description,
    cn_client: req.body.cn_client,
    company: req.body.company,
    isEdited: false,
    isActive: true,
    imagePath: req.file.path.replace("\\","/"),
    image:null
  });

  // Save the new product to the database
  newProduct.save().then(() => {
    console.log("+ New item added successfully");
    res.status(200).json({
      message: "successfully added",
      inserted: newProduct,
    });
  });
});

// ------------------------------------------------------------------------------------

// Delete a student
router.delete("/:id", function (req, res) {
  const id = req.params.id;
  productModel.findByIdAndDelete(id, (err, doc) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: err.message });
    }

    if (!doc) {
      console.log(`- Error deleting, couldn't find id '${id}'`);
      return res
        .status(404)
        .json({ error: `Error deleting- id '${id}' not found` });
    }

    console.log("+ Product deleted successfully", doc);
    return res.status(200).json({
      message: "Successfully deleted",
      deleted: doc,
    });
  });
});

module.exports = router;
