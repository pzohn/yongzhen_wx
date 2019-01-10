Page({
  data: {
    detailsData: {},
    goodsTAndList: [
      {
        title: '下单时间',
        message: '2018/02/12 21:58:59'
      },
      {
        title: '订单编号',
        message: 1212121215456
      },
      {
      title: '收货位置',
      message: '万盛南加州6-1-103'
      }, 
      {
        title: '实付',
        message: 0.06
      }
    ],
    stars: [1, 1, 1, 1, 1]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id;
    this.initData(id)



    console.log(getApp().globalData.tempDataFromMyOrderToDetail);
    let tempData = getApp().globalData.tempDataFromMyOrderToDetail;
    console.log("tempData---->", typeof tempData)
    this.setData({
      detailsData: tempData
    })

  },

  initData: function (id) {
    var page = this;
    var app = getApp();
    wx.request({
      url: 'https://www.yztcc.com/getTrades',
      data: {
        phone: app.globalData.phone,
        type: id
      },
      method: 'POST',
      success: function (res) {
        var array = [];
        var count = res.data.count;
        if (count) {
          for (var index in res.data.trades) {
            var object = new Object();
            object.BillDate = res.data.trades[index].date;
            object.BillNo = res.data.trades[index].out_trade_no;
            object.Address = res.data.trades[index].leasing_name;
            object.EmpFullName = res.data.trades[index].body;
            object.TotalTaxAmount = res.data.trades[index].total_fee;
            object.Status = page.getStatus(res.data.trades[index].status);
            array[index] = object;
          }
        }
        page.setData({ orderShopList: array });
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

  // 点击了星星
  checkStar(e) {
    let i = e.currentTarget.dataset.i;
    console.log("星星该变色了。e-->", i)
    let tempArr = []
    for (let j = 0; j < 5; j++) {
      if (j <= i) {
        tempArr.push(1)
      } else {
        tempArr.push(0)
      }
    }
    this.setData({
      stars: tempArr
    })
  }

})