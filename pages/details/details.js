var WxAutoImage = require('../../js/detailImage.js');
var app = getApp();

Page({
  data: {
    title:'',
    address:'',
    shop:'',
    register:'',
    num:'',
    place:'',
    use:'',
    phone:'',
    price:0,
    imgsrc:'',
    detail_pic:'',
    totalPrice:0,
    leasing_ids:'',
    iscollect: true,
    typeFlag:false,
    casArray: [],
    unit:[],
    details:'',
    casIndex: 0,
    dayArray: ['请选择天数>', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
    dayIndex: 0,
    leasing_id:0
  },

  onLoad: function (options) {
    var id = options.id;
    if (id != 0 && id != undefined) {
      this.initData(id);
    }
  },

  onShow: function () {
    var page = this;
    var app = getApp();
    if (app.globalData.backToLeasing == true){
      wx.request({
        url: 'https://www.yztcc.com/getLeasing',
        data: {
          id: app.globalData.leasing_id
        },
        method: 'POST',
        success: function (res) {
          page.setData({
            address: res.data.name,
            phone: res.data.phone,
          });
          app.globalData.backToLeasing = false;
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
    }
  },

  initData: function (id) {
    var page = this;
    var app = getApp();
    wx.request({
      url: 'https://www.yztcc.com/getGood',
      data: {
        id: id
      },
      method: 'POST',
      success: function (res) {
        var casArray = [];
        casArray[0] = '请选择>';
        casArray[1] = res.data.price_month + '元/月';
        casArray[2] = res.data.price_day + '元/日';
        var unit = [];
        unit[0] = 0;
        unit[1] = res.data.price_month;
        unit[2] = res.data.price_day;
        page.setData({ 
          title: res.data.name,
          shop: res.data.brand,
          register: res.data.register,
          num: res.data.number,
          place: res.data.product,
          use: res.data.use,
          imgsrc: 'https://www.yztcc.com/product_pic/' + res.data.product_pic,
          detail_pic: 'https://www.yztcc.com/detail_pic/' + res.data.detail_pic,
          price: res.data.price,
          address: res.data.leasing_first.name,
          phone: res.data.leasing_first.phone,
          leasing_id: res.data.leasing_first.id,
          casArray: casArray,
          unit: unit,
          leasing_ids: res.data.leasings
         });
        app.globalData.backToLeasing = false;
        app.globalData.leasing_id = page.data.leasing_id;
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

  pay: function () {
    var page = this;
    var app = getApp();
    if (page.data.casIndex == 0){
      wx.showModal({
        title: '错误提示',
        content: '请选择租赁方式!',
        showCancel:false,
        success: function (res) {
          if (res.confirm) {
            return;
          }
        }
      });
      return;
    }

    if (page.data.casIndex == 2 && page.data.dayIndex == 0) {
      wx.showModal({
        title: '错误提示',
        content: '租赁天数不能少于1天!',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
          }
        }
      });
      return;
    }

    var details;
    app.globalData.phone = '18303741618';
    if (page.data.casIndex == 1){
      details = '1@' + page.data.unit[page.data.casIndex] + '@1';
    } else if (page.data.casIndex == 2){
      details = '2@' + page.data.unit[page.data.casIndex] + '@' + page.data.dayArray[page.data.dayIndex];
    }
    wx.login({
      success: res => {
        var code = res.code;
        console.log(code);
        console.log(page.data.title);
        console.log(details);
        console.log(app.globalData.phone);
        console.log(app.globalData.leasing_id);
        
        if (code) {
          wx.request({
            url: 'https://www.yztcc.com/onPay',
            data: {
              js_code: code,
              body: page.data.title,
              details: details,
              phone: app.globalData.phone,
              leasing_id: app.globalData.leasing_id,
            },
            method: 'POST',
            success: function (res) {
              console.log(res);
              wx.requestPayment(
                {
                  'timeStamp': res.data.timeStamp,
                  'nonceStr': res.data.nonceStr,
                  'package': res.data.package,
                  'signType': 'MD5',
                  'paySign': res.data.paySign,
                  'success': function (res) {
                    console.log(res);
                    wx.showModal({
                      title: '支付成功',
                      content: '支付成功!',
                    })
                  },
                  'fail': function (res) {
                  },
                  'complete': function (res) {
                  }
                })
            },
            fail: function (res) {
            }
          })
        }
      }
    })
  },

  collect: function () {
    this.setData({
      iscollect: !this.data.iscollect
    })
  },

  select: function () {
    var ids = this.data.leasing_ids;
    wx.navigateTo({
      url: '../leasing/leasing?ids=' + ids
    });
  },

  typeChange: function (e) {
    this.setData({
      casIndex: e.detail.value,
      totalPrice: this.data.unit[e.detail.value]
    })
    if (e.detail.value == 2){
      this.setData({
        typeFlag: true
      })
    }else{
      this.setData({
        typeFlag: false
      })
    }
  },

  dayChange: function (e) {
    this.setData({
      dayIndex: e.detail.value,
      totalPrice: this.data.unit[2] * e.detail.value
    })
  },

  cusImageLoad: function (e) {
    var that = this;
    that.setData(WxAutoImage.wxAutoImageCal(e));
  }
})