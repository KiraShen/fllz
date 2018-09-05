//app.js
import utils from 'utils/util'
App({
  onLaunch: function () {
    wx.BaaS = requirePlugin('sdkPlugin')
    wx.BaaS.wxExtend(wx.login, wx.getUserInfo, wx.requestPayment)
    let clientID = 'f408262730f97878b88c'
    wx.BaaS.init(clientID)
    
    // 登录
    wx.BaaS.login(false).then(res => {
      // 登录成功
      console.log("login successful. UserInfo:",res)
      this.globalData.userID = res.id
      this.globalData.userObject = res
    }, res => {
      // 登录失败
      console.log("Login Error.")
      utils.openAlert("Login Error.")
    })
    // 获取用户信息

    //
  },
  globalData: {
    //用户信息
    userID: null,
    userObject:null,
    handleStatus:false,
    bindPersonStatus:false,
    uID:"0",
    personObject:null,
    //
    orderTable:49813,
    agentTable:49812,
    userTable:49806,
    typeTable:49761,
    fllzContent :1535705352641453,
  }
})