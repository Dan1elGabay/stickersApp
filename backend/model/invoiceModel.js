const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { itemModel } = require('../model/itemModel')

const invoiceSchema = new Schema({
  clientName: String,
  items: [ { type: Schema.Types.ObjectId, ref:'item' } ]
})

module.exports = mongoose.model('invoice', invoiceSchema);