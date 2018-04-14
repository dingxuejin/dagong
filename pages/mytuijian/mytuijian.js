// pages/mytuijian/mytuijian.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
      userInfo:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var isphone = wx.getStorageSync('phone');
    console.info(isphone);
    if (isphone == null || isphone == '') {
      wx.redirectTo({
        url: '../place/place',
      })

    }
    console.info(app.globalData.userInfo)
  
    var token = wx.getStorageSync('token') || "";
    var that=this
    
    if (token != "" && token != null) {
      wx.request({
        url: "https://wei1.ksweizhan.cn/tp3/index.php/home/Tuijian/tuiSelect",
        data: {
          token: token,
          
        },
        //method:'POST',
        //header: { 'content-type': 'application/x-www-form-urlencoded' },
        success: function (res) {
          console.log(res.data);
         that.setData({
           userInfo:res.data,
         })
       
        }
      })
    }
  
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
  
  }
})