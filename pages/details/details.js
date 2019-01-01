var WxAutoImage = require('../../js/detailImage.js');
var app = getApp();

Page({
  data: {
    title:'',
    address:'北京永乐医疗租赁公司',
    shop:'',
    register:'',
    num:'',
    place:'',
    use:'',
    phone:'13937890118',
    price:0,
    imgsrc:'',
    totalPrice:0,
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 3000,
    duration: 1200,
    iscollect: true,
    typeFlag:false,
    casArray: ['请选择>', '30元/月', '1元/日'],
    unit:[0,30,1],
    casIndex: 0,
    dayArray: ['请选择天数>', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
    dayIndex: 0,
  },

  onLoad: function (options) {
    var id = options.id;
    if (id == 0) {
      return;
    }
    this.initData(id);
  },

  initData: function (id) {
    var page = this;
    wx.request({
      url: 'https://www.yztcc.com/getGood',
      data: {
        id: id
      },
      method: 'POST',
      success: function (res) {
        page.setData({ 
          title: res.data.name,
          shop: res.data.brand,
          register: res.data.register,
          num: res.data.number,
          place: res.data.product,
          use: res.data.use,
          imgsrc: 'https://www.yztcc.com/product_pic/' + res.data.product_pic,
          price: res.data.price,
          price: res.data.price,

         });
        var array = [];
        for (var index in res.data.goods) {
          var object = new Object();
          object.img = 'https://www.yztcc.com/product_pic/' + res.data.goods[index].product_pic;;
          object.title = res.data.goods[index].name;
          object.company = res.data.goods[index].company;
          object.city = '所在城市:' + res.data.goods[index].city;
          object.price_day = res.data.goods[index].price_day + '元/天';
          object.price_month = res.data.goods[index].price_month + '元/月';
          object.id = res.data.goods[index].id;
          array[index] = object;
        }
        page.setData({ array: array });
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

  collect: function () {
    this.setData({
      iscollect: !this.data.iscollect
    })
    console.log(this.data.iscollect);
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