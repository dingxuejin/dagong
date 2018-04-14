// pages/news/news.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    hidden: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: 'https://wei1.ksweizhan.cn/tp3/index.php/home/New/newList',
      success: function (res) {
        that.setData({ list: res.data, hidden: true, })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this
    wx.request({
      url: 'https://wei1.ksweizhan.cn/tp3/index.php/home/job/topnews', //仅为示例，并非真实的接口地址


      success: function (res) {
        console.log(res.data),
          that.setData({

            topnews: res.data,


          });
        if (res.data.set.isshow == "0") {
          that.setData({
            show1: false,
          });

        } else if (res.data.set.isshow == "1") {
          that.setData({
            show1: true,
          });

        }

      },
    })
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
  
  }
})