//index.js


//获取应用实例
var app = getApp()

Page({
  data: {
    inputShowed: false,
    inputVal: "",
    serchinfo:[],
    topnews:[],
    list:[],
    showModal: false,
    hidden:false,
    show1:false,


    choosecss1:"",
    choosecss2: "",
    choosecss3: "",
    choosecss4: "",
    choosecss5: "",

   
    
    imgUrls: [
      'http://wei1.ksweizhan.cn/layui/images/1.jpg',
      'http://wei1.ksweizhan.cn/layui/images/2.jpg',
      'http://wei1.ksweizhan.cn/layui/images/3.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000
  },
  ////////////////////////
 gomap:function(){
   wx.openLocation({
     latitude: 31.348272,
     longitude: 120.955921,
     address: "昆山市枫景苑B区诚乐打工网（瑞帆）"
   }) 
 },

  ////////////////////////////////////
///////////
urlTo:function(e){
  console.info(e.currentTarget.dataset.url)
  
    
    app.globalData.urlTo=e.currentTarget.dataset.url
 
  wx.switchTab({
    url:"../work/work",
  })

},

urlTo1: function (e) {
  wx.switchTab({
    url: e.currentTarget.dataset.url,
  })
},

  ////////////////////////
  onReady:function(){
    var that =this
    wx.request({
      url: 'https://wei1.ksweizhan.cn/tp3/index.php/home/job/topnews', //仅为示例，并非真实的接口地址
      

      success: function (res) {
        console.log(res.data),
          that.setData({

            topnews: res.data,


          });
          if(res.data.set.isshow=="0"){
            that.setData({
              show1: false,
            });

          } else if (res.data.set.isshow == "1"){
            that.setData({
              show1: true,
            });

          }

      },
    })

  },


  onLoad:function(){
    
  this.getJobList();
  },

  getJobList:function(){
   this.setData({
      choosecss1: ".job-class-left",
      choosecss2: ".job-class-left1",
      choosecss3: ".job-class-left1",
      choosecss4: ".job-class-left1",
      choosecss5: ".job-class-left1",

    });
    var that =this;
       wx.request({
      url:'https://wei1.ksweizhan.cn/tp3/index.php/home/job/joblist',
      success:function(res){
        that.setData({ list: res.data ,hidden:true,})
      }
    })
  },
  getJobListGaoXin: function () {
    var that = this;
    that.setData({
      choosecss1: ".job-class-left1",
      choosecss2: ".job-class-left1",
      choosecss3: ".job-class-left",
      choosecss4: ".job-class-left1",
      choosecss5: ".job-class-left1",

    }),
    wx.request({
      url: 'https://wei1.ksweizhan.cn/tp3/index.php/home/job/jobListGaoXin',
      success: function (res) {
        that.setData({ list: res.data })
      }
    })
  },

   getJobListGaoBu: function () {
    var that = this;
    that.setData({
      choosecss1: ".job-class-left1",
      choosecss2: ".job-class-left",
      choosecss3: ".job-class-left1",
      choosecss4: ".job-class-left1",
      choosecss5: ".job-class-left1",

    }),
    wx.request({
      url: 'https://wei1.ksweizhan.cn/tp3/index.php/home/job/jobListGaoBu',
      success: function (res) {
        that.setData({ list: res.data })
      }
    })
  },
   getJobListTemporary: function () {
     var that = this;
     that.setData({
       choosecss1: ".job-class-left1",
       choosecss2: ".job-class-left1",
       choosecss3: ".job-class-left1",
       choosecss4: ".job-class-left",
       choosecss5: ".job-class-left1",

     }),
     wx.request({
       url: 'https://wei1.ksweizhan.cn/tp3/index.php/home/job/jobListGaoTemporary',
       success: function (res) {
         that.setData({ list: res.data })
       }
     })
   },

   getJobListWai: function () {
     var that = this;
     that.setData({
       choosecss1: ".job-class-left1",
       choosecss2: ".job-class-left1",
       choosecss3: ".job-class-left1",
       choosecss4: ".job-class-left1",
       choosecss5: ".job-class-left",

     }),
       wx.request({
         url: 'https://wei1.ksweizhan.cn/tp3/index.php/home/job/jobListWai',
         success: function (res) {
           that.setData({ list: res.data })
         }
       })
   },


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
     var that=this;
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
      * 弹出框蒙层截断touchmove事件
      */
  
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
   }
 
})
          