//app.js
App({
 onLaunch:function(){
    var token = wx.getStorageSync('token') || "";
    console.info("从本地缓存中获取token");
    if (token==null || token==""){
      //token为空执行登录
      var that = this;
      console.info("token is null");
      this.login();
      //console.info(this.globalData.userInfo)
    }else{
      //token不为空获取user信息
      this.queryUserInfo(token);
      console.info("token is not null");
      console.info(this.globalData.userInfo)
      console.info(wx.getStorageSync('token'));
    }
 },
/////////////
 //获取用户信息
 getUserInfo: function () {

   //如果全局用户信息存在，则直接设置数据
   if (this.globalData.userInfo) {
     console.info("全局用户信息存在，则直接设置数据")
     console.info(wx.getStorageSync('token'))
     

     //不存在则调用登录接口
   } else {
     console.info("本地全局用户数据不存在，调用登录接口"),
     this.login() 
   }
 },

 ///////
queryUserInfo:function(token){
    var that =this;
    //console.info(token);
    if(token!=""&& token!=null){
        wx.request({
          url: "https://wei1.ksweizhan.cn/tp3/index.php/home/User/getUserInfo",
          data:{token:token},
          //method:'POST',
          //header: { 'content-type': 'application/x-www-form-urlencoded' },
          success:function(res){
            var user={};
            user.nickName=res.data.nickname;
            user.avatarUrl=res.data.head_img;
            user.phone=res.data.phone;
            user.name = res.data.name;
            user.openid = res.data.openid;
            
            
            that.globalData.userInfo=user;
            
            
          }
        })
    }
},


 ///////////
 

login: function(){
    var that=this;
    //获取授权码
    wx.login({
        success:function(e){
            console.info(e.code)
            //获取用户信息
            wx.getUserInfo({
                  success:function(res){
                    that.globalData.isLogin=true;
                      that.globalData.userInfo =res.userInfo;
                      //console.info(res.userInfo);
                      //调用后端登录接口
                      wx.request({
                        url: "https://wei1.ksweizhan.cn/tp3/index.php/home/User/loginAction",
                        data:{
                            code:e.code,
                            nickname:res.userInfo.nickName,
                            head_img:res.userInfo.avatarUrl
                        },
                        //若成功，保存返回的token到本地缓存
                        success:function(res){
                            
                              console.info(res.data);
                              wx.setStorageSync('token', res.data);
                              that.queryUserInfo(res.data)
                            
                        }
                      })

                  },
                  fail: function () {
                    that.globalData.isLogin = false;
                    wx.request({
                      url: "https://wei1.ksweizhan.cn/tp3/index.php/home/User/loginAction",
                      data: {
                        code: e.code,
                       
                      },
                      //若成功，保存返回的token到本地缓存
                      success: function (res) {

                        
                        wx.setStorageSync('token', res.data);
                        that.queryUserInfo(res.data)
                        console.info(res.data);
                      }
                    })
                  }
            })  
        }

    })


 },

 globalData:{
    userInfo:null,
    isLogin:null,
    urlTo:"",
 }
})