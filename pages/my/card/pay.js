
import utils from '../../../utils/util'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    height:app.globalData.windowWidth*0.52,
    top:app.globalData.windowWidth*0.26
  },

  payEvent:function(event){
    setTimeout(function(){
    let type = event.currentTarget.dataset.membershipType;
    console.log("membershiptype:",type);
    let total = 1;
    let name = "";
    let mID = '0';
    let searchCount = 2;
    let bindCount = 1;
    if(type == '1'){
      console.log("type error")
      total = 38.00;
      name = "开通白银会员";
      mID = '1';
      searchCount = 5;
      bindCount = 2;
    }else if(type == '2'){
      console.log("type error")
      total = 68.00;
      name = "开通黄金会员";
      mID = '2';
      searchCount = 10;
      bindCount = 3;
    }else if(type == '3'){
      console.log("type error")
      total = 98.00;
      name = "开通白金会员";
      mID = '3';
      searchCount = 20;
      bindCount = 5;
    }else{
      //erroe
      console.log("type error")
    }
    let params = {
      totalCost: total,
      merchandiseDescription: name,
      merchandiseSchemaID:51013,
      merchandiseRecordID:mID
    }

    console.log("params",params)
    wx.BaaS.pay(params).then(res => {
      // success. 支付请求成功响应，可以在 res 中拿到 transaction_no 和支付结果信息
      /* 1.1.4 以下版本：
        如果支付失败, 则可以获取失败原因
        注: 只要是服务器有返回的情况都会进入 success, 即便是 4xx，5xx 都会进入
            所以非系统级别错误导致的支付失败也会进入这里, 例如用户取消，参数错误等
            这是微信的处理方式与 BaaS 服务(器)无关
      */
      console.log(res)
      let nowDate = utils.formatTime(new Date())
      console.log("nowDate",nowDate)
      app.globalData.paystatus = true
      app.globalData.paytime = nowDate
      app.globalData.membertype = mID

      let MyUser = new wx.BaaS.User()
      let currentUser = MyUser.getCurrentUserWithoutData()
      app.globalData.payStatus = true
      currentUser.set({
        'paystatus': true,
        'paytime': nowDate,
        'membertype':mID,
        'search_count':searchCount,
        'bind_count':bindCount
      }).update().then(res => {
        console.log("pay success")
        utils.getWxUserInfo(app.globalData.userID, (ress) => {
          console.log("user info:" ,ress.data.objects[0])
          let bufObject = ress.data.objects[0]
          wx.setStorage({
            key:"bind_user_info",
            data:bufObject
          })
        })
      }, err => {
        // err
      })
      
    }, err => {
      // 未完成用户授权或发生网络异常等
      console.log(err)
      if (err.code === 603) {
        console.log('用户尚未授权')
        wx.showModal({
          content: "用户尚未授权，请授权...",
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              console.log('openAlert ok.')
            }
          }
        });
      } else if (err.code === 607) {
        console.log('用户取消支付')
        wx.showModal({
          content: "支付被取消...",
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              console.log('openAlert ok.')
            }
          }
        });
      } else if (err.code === 608){
        console.log(err.message)
        wx.showModal({
          content: "支付失败，请检查网络...",
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              console.log('openAlert ok.')
            }
          }
        });
      }
      
    })
    },500)
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    wx.setNavigationBarTitle({
      title: '开通会员'
    })

  }

})