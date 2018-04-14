// pages/mysign/mysign.js
var app = getApp();
var util = require('../../utils/util.js');
Page({
  

  /**
   * 页面的初始数据
   */
  data: {
    data_now: util.formatTime(new Date),
    sign: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  //////////////
  fanAct:function(e){
   var sign_id=e.target.dataset.signid;
   var job_name = e.target.dataset.job_name;
   var name =e.target.dataset.name;
   var phone =e.target.dataset.phone;
   var fan = e.target.dataset.fan;
   var fan_data = e.target.dataset.fan_data;
   var parent_id = e.target.dataset.parent_id;
   wx.request({
     url: "https://wei1.ksweizhan.cn/tp3/index.php/home/Sign/fan",
     data: {
       sign_id:sign_id,
       job_name: job_name,
       name:name,
       phone:phone,
       fan: fan,
       fan_data: fan_data,
       parent_id: parent_id
     },
     success: function (res) {
       wx.showToast({
         title:res.data,
       })
       //console.info(data_now);
      
     }
   })
    
  },



  ////////////
  onLoad: function (options) {
    

    var that = this;
    wx.request({
      url: "https://wei1.ksweizhan.cn/tp3/index.php/home/Tuijian/tuiSelectInfo",
      data: {
        openid: options.openid
      },
      success: function (res) {
        
        //console.info(data_now);
        console.info(res.data);
        that.setData({
          sign: res.data
        })
      }
    })
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
    var isphone = wx.getStorageSync('phone');
    console.info(isphone);
    if (isphone == null || isphone == '') {
      wx.redirectTo({
        url: '../place/place',
      })

    }
  
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