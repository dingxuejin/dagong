//index.js
//获取应用实例
var app = getApp()

Page({
  data: {
    list: [],
    page: 1,
    pageSize: 6,
    jobid: "",//默认初始为空 显示全部工作
    moreItem: true, //用来判断下拉有无数据了
    hidden: false,
    showModal: false,
    inputShowed: false,
    inputVal: "",
    serchinfo: [],



    choosecss1: "",
    choosecss2: "",
    choosecss3: "",
    choosecss4: "",
    choosecss5: "",
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
      this.getJobList(this.data.jobid);

  },
  /**
    * 页面上拉触底事件的处理函数
    */
  onReachBottom: function () {
    if (this.data.moreItem) {
      this.data.hidden = false,
        this.getJobList(this.data.jobid);

    } else {
      wx.showToast({
        title: '没有更多数据',
      })
    }
  },
  //标签切换事件
  jobTips: function (event) {
    this.data.page = 1,//初始化当前页为1
      this.data.list = [];//初始化列表数据集
    var cssid = event.currentTarget.dataset.jobid;
    this.csschoose(cssid);


    this.getJobList(event.currentTarget.dataset.jobid);
  },
  onLoad: function (options) {
    this.data.page = 1;//初始化当前页为1
    this.data.list = [];//初始化列表数据集

    if (options.jobidd == "" || options.jobidd == null) {
      options.jobidd = "waidi";
    }
    this.setData({
      choosecss1: ".job-class-text1",
      choosecss2: ".job-class-text1",
      choosecss3: ".job-class-text1",
      choosecss4: ".job-class-text1",
      choosecss5: ".job-class-text",

    });
    this.csschoose(options.jobidd);
    this.getJobList(options.jobidd);



  },
  onReady: function () {

    //this.getJobList(app.globalData.urlTo);
  },
  /*jobid为字符串 用来判断工作种类*/
  getJobList: function (jobid) {
    var that = this;
    wx.request({
      url: 'https://wei1.ksweizhan.cn/tp3/index.php/home/jobAll/jobClass',
      data: {
        page: that.data.page,
        pageSize: that.data.pageSize,
        jobid: jobid,
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
            jobid: jobid,

          })

        } else {
          that.setData({
            list: that.data.list.concat(res.data.data),
            page: that.data.page + 1,
            moreItem: true,
            hidden: true,
            jobid: jobid
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
  csschoose: function (cssid) {
    if (cssid == "hot_tui") {
      this.setData({
        choosecss1: ".job-class-text",
        choosecss2: ".job-class-text1",
        choosecss3: ".job-class-text1",
        choosecss4: ".job-class-text1",
        choosecss5: ".job-class-text1",
      });
    } else if (cssid == "hot_gaobu") {
      this.setData({
        choosecss1: ".job-class-text1",
        choosecss2: ".job-class-text",
        choosecss3: ".job-class-text1",
        choosecss4: ".job-class-text1",
        choosecss5: ".job-class-text1",
      });

    } else if (cssid == "hot_gaoxin") {
      this.setData({
        choosecss1: ".job-class-text1",
        choosecss2: ".job-class-text1",
        choosecss3: ".job-class-text",
        choosecss4: ".job-class-text1",
        choosecss5: ".job-class-text1",
      });

    } else if (cssid == "temporary") {
      this.setData({
        choosecss1: ".job-class-text1",
        choosecss2: ".job-class-text1",
        choosecss3: ".job-class-text1",
        choosecss4: ".job-class-text",
        choosecss5: ".job-class-text1",
      });

    } else if (cssid == "waidi") {
      this.setData({
        choosecss1: ".job-class-text1",
        choosecss2: ".job-class-text1",
        choosecss3: ".job-class-text1",
        choosecss4: ".job-class-text1",
        choosecss5: ".job-class-text",
      });

    }

  }

})
