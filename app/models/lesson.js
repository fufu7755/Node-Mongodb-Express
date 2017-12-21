const mongoose = require('mongoose')

const LessonSchema = require('../schemas/lesson')

const Lesson = mongoose.model('Lesson', LessonSchema)

module.exports = Lesson
