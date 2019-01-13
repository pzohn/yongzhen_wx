Page({
  data: {
    goods: [],
    pic:'',
    status:'',
    goodsTAndList: [
    ],
    stars: [1, 1, 1, 1, 1]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id;
    this.initData(id);
  },

  initData: function (id) {
    var page = this;
    var app = getApp();
    wx.request({
      url: 'https://www.yztcc.com/getTrade',
      data: {
        id: id
      },
      method: 'POST',
      success: function (res) {
        var array = [];
        var index = 0;
        if (res.data.created_at != "") {
          var object = new Object();
          object.title = '下单时间';
          object.message = res.data.created_at;
          array[index] = object;
          index++;
        }
        if (res.data.out_trade_no != ""){
          var object = new Object();
          object.title = '订单编号';
          object.message = res.data.out_trade_no;
          array[index] = object;
          index++;
        }
        if (res.data.address != "") {
          var object = new Object();
          object.title = '收货位置';
          object.message = res.data.address;
          array[index] = object;
          index++;
        }
        if (res.data.type != 0) {
          var object = new Object();
          object.title = '租赁类型';
          if (res.data.type == 2){
            object.message = '按日租赁';
          }else if (res.data.type == 1) {
            object.message = '按月租赁';
          }
          array[index] = object;
          index++;
        }
        if (res.data.day != 0) {
          var object = new Object();
          object.title = '租赁天数';
          object.message = res.data.day + '天';
          array[index] = object;
          index++;
        }
        var object = new Object();
        object.title = '实付';
        object.message = res.data.total_fee + '元';
        array[index] = object;

        var status = page.getStatus(res.data.status);

        var arrayTmp = [];
        var object = new Object();
        object.pic = 'https://www.yztcc.com/product_pic/' + res.data.good.product_pic;
        object.name = res.data.good.name;
        object.id = res.data.good.id;
        arrayTmp[0] = object;
        page.setData({ 
          goodsTAndList:array,
          status: status,
          goods:arrayTmp
          });
          console.log(page.data.goods);
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

  getStatus: function (status) {
    if (status == 2) {
      return '配送中';
    }
    else if (status == 3) {
      return '未归还';
    }
    else if (status == 4) {
      return '已完成';
    }
    else {
      return '无状态';
    }
  },

  detail:function() {
    var id = this.data.goods[0].id;
    wx.navigateTo({
      url: '../details/details?id=' + id
    });
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