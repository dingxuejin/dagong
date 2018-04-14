// pages/user/user.js
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {}
  },


onShow:function(){
  var isphone = wx.getStorageSync('phone');
  console.info(isphone);
  if (isphone == null || isphone == '') {
    wx.redirectTo({
      url: '../place/place',
    })

  }else{
    app.getUserInfo()
  }
    
  
  
    
},
////////////////////////
gomap: function () {
  wx.openLocation({
    latitude: 31.348272,
    longitude: 120.955921,
    address: "昆山市枫景苑B区诚乐打工网（瑞帆）"
  })
},

  ////////////////////////////////////

 
  onLoad: function () {
    
    
       
    //app.getUserInfo()

     
   
    console.info(wx.getStorageSync('token'));
    
    
    this.setData({
       userInfo: app.globalData.userInfo
     })
    console.info(app.globalData.userInfo);
  },
  
  onLaunch: function () {
   
  }
 
})