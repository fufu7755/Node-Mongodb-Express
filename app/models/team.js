const mongoose = require('mongoose')

const TeamSchema = require('../schemas/team')

const Team = mongoose.model('Team', TeamSchema)

module.exports = Team
