const Lesson = require('../models/lesson')
const _ = require('underscore')

// admin team page
exports.list = function(req, res) {
  Lesson.fetch(function(err, lessones) {
    if(err) {
      console.log(err)
    }

    res.render('admin_lesson', {
      title: '课程管理',
      lessones: lessones,
      lesson: []
    })
  })
}

// team add page
exports.save = function(req, res) {
  const id = req.body.lesson._id
  const lessonObj = req.body.lesson
  let _lesson

  if(id) {
    console.log('update new')
    Lesson.findById(id, function(err, lesson) {
      if(err) {
        console.log(err)
      }

      _lesson = _.extend(lesson, lessonObj)
      _lesson.save(function(err, lesson) {
        if(err) {
          console.log(err)
        }

        res.redirect('/admin/lesson')
      })
    })
  } else {

    _lesson = new Lesson({
      name: lessonObj.name,
      summary: lessonObj.summary,
      price: lessonObj.price,
      time: lessonObj.time,
      classes: lessonObj.classes
    })

    _lesson.save(function(err, lesson) {
      if(err) {
        console.log(err)
      }

      res.redirect('/admin/lesson')
    })
  }
}

// team del
exports.del = function(req, res) {
  const id = req.query.id
  console.log(id)
  if(id) {
    Lesson.remove({_id: id}, function(err, item) {
      if(err) {
        console.log(err)
      }else {
        res.json({success: 1})
      }
    })
  }
}
