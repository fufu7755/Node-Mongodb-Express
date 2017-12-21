const Index = require('../app/controllers/index')
const Team = require('../app/controllers/team')
const User = require('../app/controllers/user')
const Msg = require('../app/controllers/msg')
const Lesson = require('../app/controllers/lesson')


module.exports = function(app) {
  //pre handle user
  // 判断用户是否登录
  app.use(function(req, res, next) {
    const _user = req.session.user
    // 存到本地变量 在用户退出的时候自动清除了本地的user
    app.locals.user = _user
    next()
  })

  // index page
  app.get('/', Index.index)

  // admin team page
  app.get('/admin/team', User.signinRequired, Team.team)

  // team add page
  app.post('/admin/team/add', User.signinRequired, Team.savePoster, Team.save)

  // team del
  app.delete('/admin/team', User.signinRequired, Team.del)

  // user signin page
  app.get('/signin', User.showSignin)

  // user signup page
  app.get('/signup', User.showSignup)

  // user page
  app.get('/user', User.user)

  // user signin
  app.post('/user/signin', User.signin)

  // user signup
  app.post('/user/signup', User.signup)

  // user logout
  app.get('/logout', User.logout)

  // Msg
  app.post('/msg', Msg.save)
  app.get('/msg/list', User.signinRequired, Msg.list)
  app.delete('/msg/del', User.signinRequired, Msg.del)


  // lesson
  app.get('/admin/lesson', User.signinRequired, Lesson.list)
  app.post('/admin/lesson/add', User.signinRequired, Lesson.save)
  app.delete('/lesson/del', User.signinRequired, Lesson.del)

}
