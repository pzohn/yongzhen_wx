// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: [],
    index:0,
    hiddenLoading: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id;
    if(id == 0){
      return;
    }
    this.initData(id);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var tt = this;
    setTimeout(function () {
      tt.setData({
        hiddenLoading: true
      });
    }, 2000)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  initData: function (id) {
    var page = this;
    wx.request({
      url: 'https://www.yztcc.com/getGoodsByType',
      data: {
        type_id: id
      },
      method: 'POST',
      success: function (res) {
        var count = res.data.count;
        if(count){
          var array = [];
          for (var index in res.data.goods) {
            var object = new Object();
            object.img = 'https://www.yztcc.com/product_pic/' + res.data.goods[index].product_pic;
            object.title = res.data.goods[index].name;
            object.company = res.data.goods[index].company;
            object.city = '所在城市:' + res.data.goods[index].city;
            object.price_day = res.data.goods[index].price_day + '元/天';
            object.price_month = res.data.goods[index].price_month + '元/月';
            object.id = res.data.goods[index].id;
            array[index] = object;
          }
          page.setData({ array: array });
        }
      },
      fail: function (res) {
        wx.showModal({
          title: '错误提示',
          content: '服务器无响应，请联系工作人员!',
          success: function (res) {
            if (res.confirm) {
            } else if (res.cancel) {
            }
          }
        })
      }
    })
  },

  seeDetail: function (e) {
    var id = this.data.array[e.currentTarget.id].id;
    console.log(id);
    wx.navigateTo({
      url: '../details/details?id=' + id
    });
  }
})