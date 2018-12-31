// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var array = this.initData();
    this.setData({ array: array });
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

  },
  initData: function () {
    var array = [];
    var object1 = new Object();
    object1.img = "/images/search/1.jpg";
    object1.title = '鱼跃全自动医用呼吸机';
    object1.company = '苏州鱼跃医疗科技';
    object1.city = '所在城市:全国';
    object1.price = '10元/天';
    array[0] = object1;

    var object2 = new Object();
    object2.img = "/images/search/2.jpg";
    object2.title = '飞利浦呼吸机';
    object2.company = '美国飞利浦伟康公司';
    object2.city = '所在城市:全国';
    object2.price = '15元/天';
    array[1] = object2;

    var object3 = new Object();
    object3.img = "/images/search/3.jpg";
    object3.title = '瑞思迈呼吸机';
    object3.company = 'ResMed Limited';
    object3.city = '所在城市:全国';
    object3.price = '18元/天';
    array[2] = object3;

    var object4 = new Object();
    object4.img = "/images/search/4.jpg";
    object4.title = '瑞迈特呼吸机';
    object4.company = '北京怡和嘉业医疗';
    object4.city = '所在城市:全国';
    object4.price = '12元/天';
    array[3] = object4;

    var object5 = new Object();
    object5.img = "/images/search/5.jpg";
    object5.title = '德百世呼吸机';
    object5.company = '美国德百世医疗';
    object5.city = '所在城市:全国';
    object5.price = '16元/天';
    array[4] = object5;

    return array;
  },

  seeDetail: function (e) {
    var id = e.currentTarget.id;
    wx.navigateTo({
      url: '../details/details'
    });
  }
})