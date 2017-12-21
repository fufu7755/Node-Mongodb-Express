const mongoose = require('mongoose')

const MsgSchema = new mongoose.Schema({
  name: String,
  email: String,
  title: String,
  msg: String,
  meta: {
    createAt:{
      type: Date,
      default: Date.now()
    }
  }
})

MsgSchema.statics = {
  fetch: function(cb) {
    return this
      .find({})
      .sort('meta.createAt')
      .exec(cb)
  },
  findById: function(id, cb) {
    return this
      .findOne({_id: id})
      .exec(cb)
  }
}

module.exports = MsgSchema
