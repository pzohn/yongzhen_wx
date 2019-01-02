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






    /*
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
    */
  },

  seeDetail: function (e) {
    var id = this.data.array[e.currentTarget.id].id;
    console.log(id);
    wx.navigateTo({
      url: '../details/details?id=' + id
    });
  }
})