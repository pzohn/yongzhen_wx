//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    tapCurrent: 0,
    address:[]
  },

  onLoad: function () {
    this.initData();
  },

  initData: function () {
    var page = this;
    var app = getApp();
    wx.request({
      url: 'https://www.yztcc.com/getAddresses',
      data: {
        login_id: app.globalData.login_id
      },
      method: 'POST',
      success: function (res) {
        var array = [];
        if (res.data != 0) {
          var count = res.data.count;
          var default_id = res.data.address_defult_id;
          if (count) {
            for (var index in res.data.addresses) {
              var object = new Object();
              object.name = res.data.addresses[index].name;
              object.phone = res.data.addresses[index].phone;
              object.detail = res.data.addresses[index].detail;
              object.id = res.data.addresses[index].id;
              if (object.id == default_id){
                object.default = true;
              }else{
                object.default = false;;
              }
              array[index] = object;
            }
          } 
        }
        page.setData({ address: array });
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

  userInfo: function () {
    wx.navigateTo({
      url: '/pages/userInfo/userInfo'
    })
  },

  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },

  discount: function (e) {
    var current = e.currentTarget.dataset.current;
    this.setData({
      tapCurrent: current
    })
  },

  newAddress: function () {
    wx.navigateTo({
      url: '/pages/newaddress/newaddress'
    })
  }
})
