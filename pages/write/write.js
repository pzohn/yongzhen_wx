Page({
  data: {
    img_url: [],
    content: '',
    title:''
  },

  onLoad: function (options) {

  },

  input: function (e) {
    this.setData({
      content: e.detail.value
    })
  },

  title: function (e) {
    this.setData({
      title: e.detail.value
    })
  },
  
  chooseimage: function () {
    var that = this;
    wx.chooseImage({
      count: 9, // 默认9  
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有  
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有  
      success: function (res) {

        if (res.tempFilePaths.length > 0) {

          //图如果满了9张，不显示加图
          if (res.tempFilePaths.length == 9) {
            that.setData({
              hideAdd: 1
            })
          } else {
            that.setData({
              hideAdd: 0
            })
          }

          //把每次选择的图push进数组
          let img_url = that.data.img_url;
          for (let i = 0; i < res.tempFilePaths.length; i++) {
            img_url.push(res.tempFilePaths[i])
          }
          that.setData({
            img_url: img_url
          })

        }
      }
    })
  },
  //发布按钮事件
  send: function () {
    var app = getApp();
    if (app.globalData.loginFlag == false) {
      wx.navigateTo({
        url: '../login/login'
      });
      return;
    }
    var that = this;
    var wxUserInfo = wx.getStorageSync('wxUserInfo');
    wx.showLoading({
      title: '上传中',
    })
    console.log(wxUserInfo.nickName);
    console.log(wxUserInfo.avatarUrl);
    console.log(that.data.content);
    console.log(that.data.title);
    console.log(app.globalData.login_id);
    wx.request({
      url: 'https://www.yztcc.com/insertTopic',
      data: {
        loginname: wxUserInfo.nickName,
        avatar_url: wxUserInfo.avatarUrl,
        content:that.data.content,
        title: that.data.title,
        login_id: app.globalData.login_id,
        tab:1
      },
      method: 'POST',
      success: function (res) {
        that.img_upload(app.globalData.login_id)
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
  //图片上传
  img_upload: function (id) {
    let that = this;
    let img_url = that.data.img_url;
    let img_url_ok = [];
    //由于图片只能一张一张地上传，所以用循环
    for (let i = 0; i < img_url.length; i++) {
      wx.uploadFile({
        //路径填你上传图片方法的地址
        url: 'https://www.yztcc.com/upload',
        filePath: img_url[i],
        name: 'file',
        formData: {
          'parent_id': id
        },
        success: function (res) {
          console.log(res.data);
          console.log('上传成功');
          //把上传成功的图片的地址放入数组中
          img_url_ok.push(res.data)
          //如果全部传完，则可以将图片路径保存到数据库
          if (img_url_ok.length == img_url.length) {
            wx.hideLoading();
          }
        },
        fail: function (res) {
          console.log('上传失败')
        }
      })
    }
  }
})