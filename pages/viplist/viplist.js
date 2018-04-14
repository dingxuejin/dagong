//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    list: [],
    page: 1,
    pageSize: 6,
    jobid: "vip",//默认初始为空 显示全部工作
    moreItem: true, //用来判断下拉有无数据了
    hidden: false,
    showModal: false,
    inputShowed: false,
    inputVal: "",
    serchinfo: [],



    
  },
  ////////////////////////////////////


  ////////////////////////////////////
  ////////////////

  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    console.info(e.detail.value);
    this.setData({
      inputVal: e.detail.value,
    });
    var that = this;
    wx.request({
      url: 'https://wei1.ksweizhan.cn/tp3/index.php/home/job/searchJob', //仅为示例，并非真实的接口地址
      data: {
        job_name: e.detail.value,

      },

      success: function (res) {
        console.log(res.data),
          that.setData({

            serchinfo: res.data,


          });

      },
    })

  },

  //////////////////////////////////////////////

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */

  onPullDownRefresh: function () {
    this.data.hidden = false,
      this.data.list = [],//初始化列表数据集
      this.data.page = 1,//初始化当前页为1
      this.getJobList();

  },
  /**
    * 页面上拉触底事件的处理函数
    */
  onReachBottom: function () {
    if (this.data.moreItem) {
      this.data.hidden = false,
        this.getJobList();

    } else {
      wx.showToast({
        title: '没有更多数据',
      })
    }
  },
  //标签切换事件

  onShow: function () {
    var isphone = wx.getStorageSync('phone');
    console.info(isphone);
    if (isphone == null || isphone == '') {
      wx.redirectTo({
        url: '../place/place',
      })

    }else{
      this.data.page = 1;//初始化当前页为1
      this.data.list = [];//初始化列表数据集


      this.getJobList();

    }

    
  },
  onReady: function () {

    //this.getJobList(app.globalData.urlTo);
  },
  /*jobid为字符串 用来判断工作种类*/
  getJobList: function () {
    var that = this;
    wx.request({
      url: 'https://wei1.ksweizhan.cn/tp3/index.php/home/jobAll/vipList',
      data: {
        page: that.data.page,
        pageSize: that.data.pageSize,
        
      },
      success: function (res) {
        console.info(res.data);
        console.log(res.data.num)
        if (that.data.page >= res.data.num) {
          //没有更多数据了
          that.setData({
            list: that.data.list.concat(res.data.data),//列表的旧数据+新数据显示
            moreItem: false,
            hidden: true,
            

          })

        } else {
          that.setData({
            list: that.data.list.concat(res.data.data),
            page: that.data.page + 1,
            moreItem: true,
            hidden: true,
            
          })

        }
      }
    })
  },
  ////////////////
  //////////////////////////////////////////////



  /**
     * 对话框确认按钮点击事件
     */


  /**
     * 弹出框蒙层截断touchmove事件
     */

  /////////////////////////////////////////////////
  /////////////////////////////////////////////////
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '找工作就找诚乐打工网！诚信，诚意为广大蓝领求职者服务！',
      path: '/pages/index/index',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  ///////////////////////
  

})
