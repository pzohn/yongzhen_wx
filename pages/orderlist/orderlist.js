// pages/shoporder/shoporder.js
Page({
  data: {
    orderShopList: [
      {
        BillDate: "2017-01-29",
        BillNo: "SO1701190081",
        Address: "深圳市杰尼斯科技有限公司",
        EmpFullName: "呼吸机",
        TotalTaxAmount: "288,000",
        Status:"已完成"
      },
      {
        BillDate: "2016-12-11",
        BillNo: "SO1701190082",
        Address: "佛山金亮计算机网络有限公司",
        EmpFullName: "呼吸机",
        TotalTaxAmount: "67,000",
        Status: "已完成"
      },
      {
        BillDate: "2017-01-11",
        BillNo: "SO1701190083",
        Address: "河南新乡时代计算机网络工程有限公司",
        EmpFullName: "呼吸机",
        TotalTaxAmount: "11,000",
        Status: "已完成"
      },
      {
        BillDate: "2016-06-06",
        BillNo: "SO1701190084",
        Address: "广州伟宏计算机有限公司",
        EmpFullName: "呼吸机",
        TotalTaxAmount: "12,111",
        Status: "配送中"
      },
      {
        BillDate: "2015-11-28",
        BillNo: "SO1701190085",
        Address: "深圳金石开电气有限公司",
        EmpFullName: "轮椅",
        TotalTaxAmount: "9,000",
        Status: "配送中"
      },
      {
        BillDate: "2017-01-29",
        BillNo: "SO1701190081",
        Address: "深圳市杰尼斯科技有限公司",
        EmpFullName: "轮椅",
        TotalTaxAmount: "288,000",
        Status: "配送中"
      },
      {
        BillDate: "2016-12-11",
        BillNo: "SO1701190082",
        Address: "佛山金亮计算机网络有限公司",
        EmpFullName: "轮椅",
        TotalTaxAmount: "67,000",
        Status: "配送中"
      },
      {
        BillDate: "2017-01-11",
        BillNo: "SO1701190083",
        Address: "河南新乡时代计算机网络工程有限公司",
        EmpFullName: "轮椅",
        TotalTaxAmount: "11,000",
        Status: "配送中"
      },
      {
        BillDate: "2016-06-06",
        BillNo: "SO1701190084",
        Address: "广州伟宏计算机有限公司",
        EmpFullName: "轮椅",
        TotalTaxAmount: "12,111",
        Status: "配送中"
      },
      {
        BillDate: "2015-11-28",
        BillNo: "SO1701190085",
        Address: "深圳金石开电气有限公司",
        EmpFullName: "轮椅",
        TotalTaxAmount: "9,000",
        Status: "未归还"
      },
      {
        BillDate: "2017-01-29",
        BillNo: "SO1701190081",
        Address: "深圳市杰尼斯科技有限公司",
        EmpFullName: "轮椅",
        TotalTaxAmount: "288,000",
        Status: "未归还"
      }
    ]

  },
  onItemClick: function (e) {
    var index = e.currentTarget.dataset.itemIndex;
    console.log(index);
  },

  onShareAppMessage: function () {

  },
  onLoad: function () {

  }
})