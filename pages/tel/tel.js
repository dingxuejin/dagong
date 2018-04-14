// pages/tel/tel.js
Page({

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
    /////////////////////////////////////////////////
    onShareAppMessage: function (res) {
      if (res.from === 'button') {
        // 来自页面内转发按钮
        console.log(res.target)
      }
      return {
        title: '找工作就找诚乐打工网！诚信，诚意为广大蓝领求职者服务！',
        path: '/pages/tel/tel',
        success: function (res) {
          // 转发成功
        },
        fail: function (res) {
          // 转发失败
        }
      }
    }
})