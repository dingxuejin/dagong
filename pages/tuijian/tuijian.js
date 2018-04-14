// pages/tuijian/tuijian.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */

  

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

  formSubmit: function (e) {
    //console.log('form发生了submit事件，携带数据为：', e.detail.value)
    var warn = ""//弹窗内容
    var flag = true
    if (e.detail.value["name"] == "") {
      warn = "请填写姓名"
    } else if (e.detail.value["phone"] == null) {
      warn = "请填写您的手机号！";
    } else if (!(/^1(3|4|5|7|8)\d{9}$/.test(e.detail.value.phone))) {
      warn = "手机号格式不正确";
    } else {
      flag = false;
      var token = wx.getStorageSync('token') || "";
      console.log(token);
      if (token != "" && token != null) {
        wx.request({
          url: "https://wei1.ksweizhan.cn/tp3/index.php/home/Tuijian/tuiInsert",
          data: {   
            token: token,
            name: e.detail.value["name"],
            phone: e.detail.value["phone"],
          },
          //method:'POST',
          //header: { 'content-type': 'application/x-www-form-urlencoded' },
          success: function (res) {
            console.info(res),
            wx.showToast({
              title: res.data,
              icon: "success",
              duration: 3000,

            });




          }
        })
      }
    }
    if (flag == true) {
      wx.showModal({
        title: '提示',
        content: warn
      })
    }
  },
})