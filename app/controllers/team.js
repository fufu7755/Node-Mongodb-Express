const Team = require('../models/team')
// express 中数据更新的中间件
const _ = require('underscore')
const fs = require('fs')
const path = require('path')

// admin team page
exports.team = function(req, res) {
  Team.fetch(function(err, teams) {
    if(err) {
      console.log(err)
    }

    res.render('admin_team', {
      title: '团队成员管理',
      teams: teams,
      team: []
    })
  })
}

// team add page
exports.save = function(req, res) {
  const id = req.body.team._id
  const teamObj = req.body.team
  let _team
  console.log(req.poster)
  if(req.poster) {
    teamObj.image = req.poster
  }
  if(id) {
    console.log('update new')
    Team.findById(id, function(err, team) {
      if(err) {
        console.log(err)
      }

      _team = _.extend(team, teamObj)
      _team.save(function(err, team) {
        if(err) {
          console.log(err)
        }

        res.redirect('/admin/team')
      })
    })
  } else {

    _team = new Team({
      name: teamObj.name,
      summary: teamObj.summary,
      job: teamObj.job,
      image: teamObj.image
    })

    _team.save(function(err, team) {
      if(err) {
        console.log(err)
      }

      res.redirect('/admin/team')
    })
  }
}

// team del
exports.del = function(req, res) {
  const id = req.query.id
  console.log(id)
  if(id) {
    Team.remove({_id: id}, function(err, team) {
      if(err) {
        console.log(err)
      }else {
        res.json({success: 1})
      }
    })
  }
}

// 存储图片的中间件
exports.savePoster = function(req, res, next) {

  const posterData = req.files.uploadPoster
  const filePath = posterData.path
  const originalFilename = posterData.originalFilename
  if (originalFilename) {
    fs.readFile(filePath, function(err, data) {
      const timestamp = Date.now()
      const type = posterData.type.split('/')[1]

      const poster = timestamp + '.' + type
      const newPath = path.join(__dirname, '../../', '/public/upload/' + poster)

      fs.writeFile(newPath, data, function(err) {
        req.poster = poster
        next()
      })
    })
  } else {
    // 没有文件上传，直接进入next
    next()
  }
}
