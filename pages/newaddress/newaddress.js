//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    region: [],
    default_flag:false
  },

  onLoad: function () {
      this.initRegion();
  },

  backAddress: function () {
    wx.navigateTo({
      url: '../address/address'
    })
  },

  bindRegionChange: function (e) {
    this.setData({
      region: e.detail.value
    })
  },

  accountInput: function (e) {
    console.log(e);
  },

  initRegion: function () {
    var arry = [];
    var app = getApp();
    arry[0] = app.globalData.province;
    arry[1] = app.globalData.city;
    arry[2] = app.globalData.district;
    this.setData({region:arry});
  },

  switch2Change: function (e) {
    this.setData({
      default_flag: e.detail.value
    })
  },
})
