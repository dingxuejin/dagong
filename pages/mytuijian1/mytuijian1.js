// pages/mytuijian1/mytuijian1.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sign:[]
  },
  //////////////
  tuiAct: function (e) {
    var sign_id = e.target.dataset.signid;
    var job_name = e.target.dataset.job_name;
    var name = e.target.dataset.name;
    var phone = e.target.dataset.phone;
    var tui = e.target.dataset.tui;
    var tui_data = e.target.dataset.tui_data;
    var parent_id = e.target.dataset.parent_id;
    wx.request({
      url: "https://wei1.ksweizhan.cn/tp3/index.php/home/Sign/tui",
      data: {
        sign_id: sign_id,
        job_name: job_name,
        name: name,
        phone: phone,
        tui: tui,
        tui_data: tui_data,
        parent_id: parent_id
      },
      success: function (res) {
        wx.showToast({
          title: res.data,
        })
        //console.info(data_now);

      }
    })

  },



  ////////////
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: "https://wei1.ksweizhan.cn/tp3/index.php/home/Tuijian/tuiSelectInfo",
      data: {
        openid: options.openid
      },
      success: function (res) {
        console.info(res.data);
        that.setData({
          sign:res.data
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
 
})