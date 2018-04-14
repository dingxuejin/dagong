// pages/userinfo/userinfo.js
var app = getApp()
var countdown = 60;
var phonenum = "";
var code="";  
var settime = function (that) {
  if (countdown == 0) {
    that.setData({
      show:"1",
      
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

//////////////////////////////////
Page({

  data: {
     userInfo:[],
     name:"",
     phone:"",
     
     
     linkTel:"",
     
     show:"1",
     last_time: '',
     
  },
  ////////////////////////////////////
  clickVerify: function () {
    var that = this;
    
    wx.request({
      url: 'https://wei1.ksweizhan.cn/tp3/index.php/Home/Sms/send_message', //仅为示例，并非真实的接口地址
      data: {
        phone: phonenum,
        
      },
      success: function (res) {
        code=res.data.code;
        
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
   
  },

  blurTel:function(e){
    phonenum = e.detail.value;
  },

  ////////////////////////////////////

  formSubmit: function (e) {
    
    console.log(code);//('form发生了submit事件，携带数据为：', e.detail.value)
    var warn=""//弹窗内容
    var flag = true
    if(e.detail.value["name"]==""){
      warn="请填写姓名"
    } else if (e.detail.value["phone"] == ""){
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
          token:token,
          name:e.detail.value["name"],
          phone:e.detail.value["phone"],
          },
        //method:'POST',
        //header: { 'content-type': 'application/x-www-form-urlencoded' },
          success: function (res) {
          
              wx.showToast({
                title: "成功提交,去报名吧",
                icon: "success",
                duration: 2000,
                success:function(){
                  app.globalData.userInfo.name = e.detail.value["name"],
                    app.globalData.userInfo.phone = e.detail.value["phone"]
                }
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

  
  onLoad: function () {
    var that=this;
    
    wx.request({
  url: 'test.php', //仅为示例，并非真实的接口地址
  data: {
     x: '' ,
     y: ''
  },
  header: {
      'content-type': 'application/json' // 默认值
  },
  success: function(res) {
    console.log(res.data)
  }
})
    this.setData({
      name: wx.getStorageSync('name'),
      phone: wx.getStorageSync('phone')
    })
    

  }

 
})