var WxAutoImage = require('../../js/detailImage.js');
var app = getApp();

Page({
  data: {
    title:'鱼跃全自动医用呼吸机',
    address:'北京永乐医疗租赁公司',
    shop:'鱼跃',
    register:'BJ1457811690',
    num:'ZOP119ILO',
    place:'北京',
    use:'适用于长期夜晚打呼噜的用户',
    phone:'13937890118',
    price:7890,
    imgsrc:'/images/search/1.jpg',
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