const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
  name: String,
  price: Number
})

const itemModel = mongoose.model('item', itemSchema);

module.exports = {
    itemSchema,
    itemModel
}