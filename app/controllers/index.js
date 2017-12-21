const Team = require('../models/team')
const Lesson = require('../models/lesson')
// index page
exports.index = function(req, res) {

  const _teams = Team.fetch(function(err, teams) {
    if(err) {
      console.log(err)
    }
    return teams
  })

  const _lessons = Lesson.fetch(function(err, lessons) {
    if(err) {
      console.log(err)
    }
    return lessons
  })

  Promise.all([_teams, _lessons]).then(function(values){
    res.render('index', {
      title: '大树教育',
      teams: values[0],
      lessons: values[1]
    })
  });


}
