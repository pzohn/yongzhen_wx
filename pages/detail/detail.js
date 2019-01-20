var util = require('../../utils/util.js');

Page({
  data: {
    title: '话题详情',
    detail: {},
    hidden: false
  },
  onLoad: function (options) {
    this.fetchData(options.id);
  },
  fetchData: function (id) {
    var self = this;
    self.setData({
      hidden: false
    });
    wx.request({
      url: 'https://www.yztcc.com/getTopicById',
      data: {
        id: id
      },
      method: 'POST',
      success: function (res) {
        console.log(res);
        var detail = {};
        detail.loginname = res.data.loginname;
        detail.avatar_url = res.data.avatar_url;
        detail.title = res.data.title;
        detail.content = res.data.content;
        detail.last_reply_at = util.getDateDiff(new Date(res.data.last_reply_at));
        var array = [];
        for (var index in res.data.replies) {
          var object = new Object();
          object.loginname = res.data.replies[index].loginname;
          object.content = res.data.replies[index].content;
          object.avatar_url = res.data.replies[index].avatar_url;
          object.id = res.data.replies[index].id;
          object.create_dt = util.getDateDiff(new Date(res.data.replies[index].create_dt));
          array[index] = object;
        }
        detail.replies = array;
        self.setData({
          detail: detail
        });
        setTimeout(function () {
          self.setData({
            hidden: true
          });
        }, 300);
      }
    });
  }
})
