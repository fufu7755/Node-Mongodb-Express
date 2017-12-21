$(function() {
  $('.del').click(function(e) {
    var target = $(e.target)
    var id = target.data('id')
    var tr = $('.item-id-' + id)
    $.ajax({
      type: 'DELETE',
      url: '/admin/team?id=' + id
    })
    .done(function(results) {
      if(results.success === 1) {
        if(tr.length > 0) {
          tr.remove()
        }
      }
    })
  })

  $('.lesson-del').click(function(e) {
    console.log('del')
    var target = $(e.target)
    var id = target.data('id')
    var tr = $('.item-id-' + id)
    $.ajax({
      type: 'DELETE',
      url: '/lesson/del?id=' + id
    })
    .done(function(results) {
      if(results.success === 1) {
        if(tr.length > 0) {
          tr.remove()
        }
      }
    })
  })

  $('.msg-del').click(function(e) {
    console.log('del')
    var target = $(e.target)
    var id = target.data('id')
    var tr = $('.item-id-' + id)
    $.ajax({
      type: 'DELETE',
      url: '/msg/del?id=' + id
    })
    .done(function(results) {
      if(results.success === 1) {
        if(tr.length > 0) {
          tr.remove()
        }
      }
    })
  })

  $('#msgSubmit').click(function(e) {
    var name = $('#form-name').val()
    var email = $('#form-email').val()
    var title = $('#form-subject').val()
    var msg = $('#form-message').val()
    $.ajax({
      type: "POST",
      url: "/msg",
      data: {
        name: name,
        email: email,
        title: title,
        msg: msg
      },
      crossDomain: true,
      datatype: "jsonp"
    })
    .done(function(results) {
      if(results.success === 1) {
        $('#myAlert').append('<div id="myAlert" class="alert alert-success"><a href="#" class="close" data-dismiss="alert">&times;</a><strong>成功！</strong>您的留言已经成功提交！</div>')
        $('#form-name').val('')
        $('#form-email').val('')
        $('#form-subject').val('')
        $('#form-message').val('')
      }
    })
  })
})
