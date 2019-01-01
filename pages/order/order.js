// pages/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickName:'',
    avatarUrl:'',
    iconArray: [
      {
        "iconUrl": '/images/icon/address.png',
        "iconText": '我的地址'
      },
      {
        "iconUrl": '/images/icon/healthy.png',
        "iconText": '健康档案'
      },
      {
        "iconUrl": '/images/icon/message.png',
        "iconText": '我的消息'
      },
      {
        "iconUrl": '/images/icon/community.png',
        "iconText": '我的社区'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  list: function() {
    wx.navigateTo({
      url: '../orderlist/orderlist'
    });
  },

  onItemClick: function (e) {
    var index = e.currentTarget.dataset.itemIndex;
    console.log(index);
    wx.navigateTo({
      url: '../info/info'
    });
  },
  onLoad: function (options) {
    var wxUserInfo = wx.getStorageSync('wxUserInfo');
    this.setData({
      nickName: wxUserInfo.nickName,
      avatarUrl: wxUserInfo.avatarUrl
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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

  }
})