const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  cn_s2p:Number,
  description:String,
  cn_client:String,
  company:String,
  isEdited:Boolean,
  isActive:Boolean,
  img:
    {
        data: Buffer,
        contentType: String
    }
})

const productModel = mongoose.model('product', productSchema);

module.exports = {
    productSchema,
    productModel
}