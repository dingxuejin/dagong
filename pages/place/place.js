// pages/place/place.js
var countdown = 60;
var phonenum = "";
var code = "";
var settime = function (that) {
  if (countdown == 0) {
    that.setData({
      show: "1",

    })
    countdown = 60;
    return;
  } else {
    that.setData({
      show: "2",

      last_time: countdown
    })

    countdown--;
  }
  setTimeout(function () {
    settime(that)
  }
    , 1000)
}
///////////////////////
Page({

  /**
   * 页面的初始数据
   */
  data: {

   
      userInfo: {},


      linkTel: "",

      show: "1",
      last_time: '',

   

  },

  ////////////////////////////////////
  clickVerify: function () {
    var that = this;
    if (phonenum == "") {
      wx.showToast({
        title: "手机号未填",
        icon: "success",
        duration: 2000,

      });
    } else if (!(/^1(3|4|5|7|8)\d{9}$/.test(phonenum))) {
      wx.showToast({
        title: "手机号格式不正确",
        icon: "success",
        duration: 2000,

      });
    } else {
      wx.request({
        url: 'https://wei1.ksweizhan.cn/tp3/index.php/Home/Sms/send_message', //仅为示例，并非真实的接口地址
        data: {
          phone: phonenum,

        },
        success: function (res) {
          code = res.data.code;

          // 将获取验证码按钮隐藏60s，60s后再次显示
          that.setData({
            show: (!that.data.show),  //false

          })
          settime(that);
          wx.showToast({
            title: res.data.msg,
            icon: "success",
            duration: 2000,

          });
        }
      })
    }
  },

  blurTel: function (e) {
    phonenum = e.detail.value;
  },

  ////////////////////////////////////  
  ////////////////////////////////////

  formSubmit: function (e) {

    console.log(code);//('form发生了submit事件，携带数据为：', e.detail.value)
    var warn = ""//弹窗内容
    var flag = true
    if (e.detail.value["name"] == "") {
      warn = "请填写姓名"
    } else if (e.detail.value["phone"] == "") {
      warn = "请填写您的手机号！";
    } else if (!(/^1(3|4|5|7|8)\d{9}$/.test(e.detail.value.phone))) {
      warn = "手机号格式不正确";
    } else if (e.detail.value["yanzheng"] == "") {
      warn = "请填写验证码！";
    } else if (e.detail.value["yanzheng"] != code) {
      warn = "验证码错误！";
    } else {
      flag = false;
      var token = wx.getStorageSync('token') || "";
      console.log(token);
      if (token != "" && token != null) {
        wx.request({
          url: "https://wei1.ksweizhan.cn/tp3/index.php/home/User/userPhoneNameUpdata",
          data: {
            token: token,
            name: e.detail.value["name"],
            phone: e.detail.value["phone"],
          },
          //method:'POST',
          //header: { 'content-type': 'application/x-www-form-urlencoded' },
          success: function (res) {
          
            wx.setStorageSync('name', e.detail.value["name"]);
            wx.setStorageSync('phone', e.detail.value["phone"]);
            
            wx.showModal({
              title: '提示',
              content: '您已成为会员',
              showCancel:false,
              success: function (res) {
                if (res.confirm) {
                  wx.switchTab({
                    url: '../index/index',
                  
                  })
                } 
              }
            })
           

           




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


  /////////////////////////

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  
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
