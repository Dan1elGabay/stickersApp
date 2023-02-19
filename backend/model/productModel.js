const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//* Each schema maps to a MongoDB collection and defines the shape of the documents within that collection.


const productSchema = new Schema({
  cn_s2p: Number,
  description: String,
  cn_client: String,
  company: String,
  isEdited: Boolean,
  isActive: Boolean,
  image: String,
  imagePath: String
});

//* To use our schema definition, we need to convert our blogSchema into a Model we can work with. To do so, we pass it into mongoose.model(modelName, schema)
const productModel = mongoose.model("product", productSchema);

module.exports = {
  productSchema,
  productModel,
};
