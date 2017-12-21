const User = require('../models/user')

// user signin
exports.showSignin =  function(req, res) {
  res.render('signin', {
    title: '用户登陆'
  })
}

// user signup
exports.showSignup = function(req, res) {
  res.render('signup', {
    title: '用户注册'
  })
}

// user
exports.user = function(req, res) {
  res.render('user', {
    title: '用户中心'
  })
}

// user signup
exports.signup = function(req, res) {
  // /user/signup/:userid
  // req.params.userid
  // /user//signup?userid=111
  // req.query.userid

  const _user = req.body.user
  console.log(_user)
  User.findOne({name: _user.name}, function(err, user) {
    if(err) {
      console.log(err)
    }
    console.log(user)
    if(user) {
      return res.redirect('/')
    } else {
      let user = new User(_user)
      console.log(user)
      user.save(function(err, user) {
        if(err) {
          console.log(err)
        }
        return res.redirect('/')
      })
    }
  })
}

// user signin
exports.signin = function(req, res) {
  const _user = req.body.user
  const name = _user.name
  const password = _user.password

  User.findOne({name: name}, function(err, user) {
    if(err) {
      console.log(err)
    }

    if(!user) {
      return res.redirect('/')
    }

    user.comparePassword(password, function(err, isMatch) {
      if(err) {
        console.log(err)
      }

      if(isMatch) {
        req.session.user = user
        return res.redirect('/user')
      } else {
        console.log('Not right')
      }
    })
  })
}

// user logout
exports.logout = function(req, res) {
  // 删除session中的user
  delete req.session.user
  // 删除本地的user
  //delete app.locals.user
  return res.redirect('/')
}

// 用户是否登录的中间件，用于用户判断
exports.signinRequired = function(req, res, next) {
  const user = req.session.user
  if (!user) {
    return res.redirect('/signin')
  }
  next()
}
