const Msg = require('../models/msg')

// team add page
exports.save = function(req, res) {
  const msgObj = req.body
  let _msg
  _msg = new Msg({
    name: msgObj.name,
    email: msgObj.email,
    title: msgObj.title,
    msg: msgObj.msg
  })

  _msg.save(function(err, msg) {
    if(err) {
      console.log(err)
    }else {
      res.json({success: 1})
    }
  })
}

// Msg list page
exports.list = function(req, res) {
  Msg.fetch(function(err, msgs) {
    if(err) {
      console.log(err)
    }

    res.render('msg_list', {
      title: '客户提交信息管理',
      msgs: msgs
    })
  })
}

// team del
exports.del = function(req, res) {
  const id = req.query.id
  console.log(id)
  if(id) {
    Msg.remove({_id: id}, function(err, msg) {
      if(err) {
        console.log(err)
      }else {
        res.json({success: 1})
      }
    })
  }
}
