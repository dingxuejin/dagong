//index.js

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
//获取应用实例
var app = getApp()

Page({
  data: {
    job: [],
    hidden:false,
    showModal: false,
    
    showModal1: false,
    linkTel: "",

    show: "1",
    last_time: '',
    fatherid:'',
    subsidy1:"",
    job_name1:"",
   
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
        url: 'http://wei1.ksweizhan.cn/tp3/index.php/Home/Sms/send_message', //仅为示例，并非真实的接口地址
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
  calling3:function(){
    this.setData({
      showModal1: false,
    })

  },
  clickArea:function(){
    this.setData({
      showModal1: true,
    })
  },

  onLoad: function (options) {
    this.setData({
      fatherid: options.id,
    })
    console.info(this.data.fatherid);
    var that = this;
    
    var job_id = options.id;
    console.log(job_id );
    wx.request({
      url: 'https://wei1.ksweizhan.cn/tp3/index.php/home/job/jobinfo',
      data: { id: job_id},
     
      success: function (res) {
        console.info(res);

        that.jobInfo = res.data;///
        that.setData({ 
          job: res.data,
          subsidy1: res.data.subsidy,
          job_name1: res.data.job_name,
        hidden:true })


      },
      fail: function(){
        console.log("shibai")
        
      }
      
    })
  },
  ////////////
  imgYu: function (event) {
        var src = event.currentTarget.dataset.src;//获取data-src
        var imgList = event.currentTarget.dataset.list;//获取data-list
        //图片预览
        wx.previewImage({
            current: src, // 当前显示图片的http链接
           urls: imgList // 需要预览的图片http链接列表
     })
    
  },
  imgYu2: function (event) {
    var src = event.currentTarget.dataset.src;//获取data-src
    var imgList = event.currentTarget.dataset.list;//获取data-list
    //图片预览
    wx.previewImage({
      current: src, // 当前显示图片的http链接
      urls: imgList // 需要预览的图片http链接列表
    })

  },

 //////////////////////////////////////////////
  signUp: function (event) {
  
    //var name = app.globalData.userInfo.name;
    //var phone = app.globalData.userInfo.phone;
    var name = wx.getStorageSync('name');
    var phone = wx.getStorageSync('phone');
    console.info(phone)
    if (name == null || phone == null||name == "" || phone == ""){
      
      wx.navigateTo({
        url: '../place/place',
      })
    }else{
        console.info("考研报名");
        console.info(this.jobInfo);
        var token = wx.getStorageSync('token') || "";
        wx.request({
          url: "https://wei1.ksweizhan.cn/tp3/index.php/home/Sign/signAdd",
          data: {
            token: token,
            jobid: this.jobInfo.id,
            
          },
          //method:'POST',
          //header: { 'content-type': 'application/x-www-form-urlencoded' },
          success: function (res) {
            console.info(res.data)
            if(res.data==="成功报名"){
              wx.showModal({
                title: '成功报名',
                content: '请于11点在门店集合，您也可以在我的报名栏目里查看信息，门店地址：昆山市枫景苑B区73栋瑞帆',
                showCancel:false,
                success: function (res) {
                  if (res.confirm) {
                    console.log('用户点击确定')
                  }
                }
              })


            }else{
              wx.showToast({
                title: res.data,
                icon: "success",
                duration: 2000,

              });

            }
            
      

          }
        })
        
       
    }
     
  },
  /* 对话框取消按钮点击事件*/
  onCancel: function () {
    this.setData({
      showModal: false
    });
  },

  /**
     * 对话框确认按钮点击事件
     */
  formSubmit: function (e)  {
    var warn = ""//弹窗内容,
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
      console.info(token);
      var that=this;
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

            wx.showToast({
              title: "以成功提交",
              icon: "success",
              duration: 2000,
              success: function(){
                app.globalData.userInfo.name = e.detail.value["name"],
                  app.globalData.userInfo.phone = e.detail.value["phone"],
                that.setData({
                  showModal: false,
                  
                });
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

  /**
     * 弹出框蒙层截断touchmove事件
     */
  preventTouchMove: function () {
  },
/////////////////////////////////////////////////
  calling: function () {
    wx.makePhoneCall({
      phoneNumber: '13375157537',
      success: function () {
        console.log("拨打电话成功！")
      },
      fail: function () {
        console.log("拨打电话失败！")
      }
    })
  },
  calling1: function () {
    wx.makePhoneCall({
      phoneNumber: '13616262260',
      success: function () {
        console.log("拨打电话成功！")
      },
      fail: function () {
        console.log("拨打电话失败！")
      }
    })
  },
  calling2: function () {
    wx.makePhoneCall({
      phoneNumber: '13914990484',
      success: function () {
        console.log("拨打电话成功！")
      },
      fail: function () {
        console.log("拨打电话失败！")
      }
    })
  },
//////////////////////////////////////
/////////////////////////////////////////////////
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      
      title: '热招：' + this.data.subsidy1 + '\t' + this.data.job_name1 + '\t打工找诚乐',
      path: '/pages/content/content?id=' + this.data.fatherid,
      success: function (res) {
        
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})
