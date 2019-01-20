var util = require('../../utils/util.js');

Page({
  data: {
    title: '话题列表',
    postsList: [],
    hidden: false,
    page: 1,
    tab: 0
  },
  onPullDownRefresh: function () {
    this.fetchData();
    console.log('下拉刷新', new Date());
  },
  onLoad: function () {
    this.fetchData();
  },
  onTapTag: function (e) {
    var self = this;
    var tab = e.currentTarget.id;
    self.setData({
      tab: tab
    });
    if (tab !== 0) {
      this.fetchData({ tab: tab });
    } else {
      this.fetchData();
    }
  },
  fetchData: function (data) {
    var self = this;
    self.setData({
      hidden: false
    });
    if (!data) data = {};
    if (!data.page) data.page = 1;
    if (data.page === 1) {
      self.setData({
        postsList: []
      });
    }
    if (self.data.tab == undefined){
      self.setData({ tab:0});
    }
    wx.request({
      url: 'https://www.yztcc.com/getTopicsByTab',
      data: {
        tab: self.data.tab
      },
      method: 'POST',
      success: function (res) {
        var array = [];
        for (var index in res.data.topics) {
          var object = new Object();
          object.loginname = res.data.topics[index].loginname;
          object.id = res.data.topics[index].id;
          object.author_id = res.data.topics[index].login_id;
          object.content = res.data.topics[index].content;
          object.create_at = res.data.topics[index].create_at;
          object.good = (res.data.topics[index].good == 1);
          object.last_reply_at = util.getDateDiff(new Date(res.data.topics[index].last_reply_at));
          object.reply_count = res.data.topics[index].reply_count;
          object.title = res.data.topics[index].title;
          object.top = (res.data.topics[index].top == 1);
          object.visit_count = res.data.topics[index].visit_count;
          object.avatar_url = res.data.topics[index].avatar_url;
          array[index] = object;
        }
        self.setData({
          postsList: array
        });
        setTimeout(function () {
          self.setData({
            hidden: true
          });
        }, 300);
      }
    });
  },
  redictDetail: function (e) {
    console.log('我要看详情');
    var id = e.currentTarget.id,
      url = '../detail/detail?id=' + id;
    wx.navigateTo({
      url: url
    })
  },
  lower: function (e) {
    var self = this;
    self.setData({
      page: self.data.page + 1
    });
    if (self.data.tab !== 'all') {
      this.fetchData({ tab: self.data.tab, page: self.data.page });
    } else {
      this.fetchData({ page: self.data.page });
    }
  }
})
