// pages/index/index.js
var QQMapWX = require('../../libs/qqmap-wx-jssdk.js');
var demo = new QQMapWX({
  key: 'JSWBZ-2UC6K-ZCTJK-AMKZN-J7WEZ-6RBPZ'
});
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      '/images/1.jpg',
      '/images/2.jpg',
      '/images/3.jpg'
    ],
    recommend: [
      { url: '/images/4.jpg', title: '双轮助行器', price: '5元/天' },
      { url: '/images/5.jpg', title: '肘杖', price: '1元/天' },
      { url: '/images/6.jpg', title: '轮椅', price: '3元/天' },
      { url: '/images/7.jpg', title: '电脑远红按摩床', price: '7元/天' },
      { url: '/images/8.jpg', title: '多功能训练床', price: '6元/天' },
      { url: '/images/8.jpg', title: '多功能训练床', price: '6元/天' },
    ],

    hotrec: [
      { url: '/images/9.jpg', title: '经颅磁刺激器', price: '10元/天' },
      { url: '/images/10.jpg', title: '儿童水疗机', price: '9元/天' },
      { url: '/images/11.jpg', title: '智能疼痛治疗仪', price: '8元/天' },
      { url: '/images/11.jpg', title: '智能疼痛治疗仪', price: '8元/天' },
      { url: '/images/11.jpg', title: '智能疼痛治疗仪', price: '8元/天' },
      { url: '/images/11.jpg', title: '智能疼痛治疗仪', price: '8元/天' }
    ],

    circular: true,
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    displayMultipleItems: 3,
    address:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var page = this;
    wx.getLocation({
      success: function(res) {
        console.log(res);
        var longitude = res.longitude
        var latitude = res.latitude

        demo.reverseGeocoder({
          location: {
            latitude: latitude,
            longitude: longitude
          },
          success: function (res) {
            var app = getApp();
            page.setData({
              address: res.result.address
            });
            app.globalData.city = res.result.address_component.city;
          },
          fail: function (res) {
            console.log("定位失败");
          },
          complete: function (res) {
          }
        });
      },
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
    var app = getApp();
    this.setData({
      address: app.globalData.city
    });
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

  select: function (e) {
    var id = e.currentTarget.id;
    wx.navigateTo({
      url: '../search/search?id=' + id
    });
  },

  switchcity: function (e) {
    var id = e.currentTarget.id;
    wx.navigateTo({
      url: '../switchcity/switchcity'
    });
  }
})