const mongoose = require('mongoose')

const MsgSchema = require('../schemas/msg')

const Msg = mongoose.model('Msg', MsgSchema)

module.exports = Msg
