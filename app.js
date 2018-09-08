//app.js
import utils from 'utils/util'
App({
  onLaunch: function () {
    let that = this
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
      utils.getWxUserInfo(res.id, (ress) => {
        console.log("user info:" ,ress.data.objects[0])
        let bufObject = ress.data.objects[0]
        if(bufObject.uID != "0"){
          that.globalData.bindPersonStatus = true
          that.globalData.uID = bufObject.uID
          that.globalData.paystatus = bufObject.paystatus
          that.globalData.paytime = bufObject.paytime
          that.globalData.bind_count = bufObject.bind_count
          that.globalData.search_count = bufObject.search_count
          that.globalData.membertype = bufObject.membertype
        }
      })
    }, res => {
      // 登录失败
      console.log("Login Error.")
      utils.openAlert("Login Error.")
    })

    //获取设备信息：屏幕宽、高等
    wx.getSystemInfo({
    success: function(res) {
      that.globalData.windowWidth = res.windowWidth
      that.globalData.windowHeight = res.windowHeight
      that.globalData.language = res.language
      }
    })

    //测试pay
      // let nowDate = utils.formatTime(new Date())
      // console.log("nowDate",nowDate)
      // that.globalData.paystatus = true
      // that.globalData.paytime = nowDate
      // that.globalData.membertype = 1

      // let MyUser = new wx.BaaS.User()
      // let currentUser = MyUser.getCurrentUserWithoutData()
      // currentUser.set({
      //   'paystatus': true,
      //   'paytime': nowDate,
      //   'membertype':1
      // }).update().then(res => {
      //   console.log("pay success")
      //   let transactionID = "wbqHpBlXWtkXIEfGhJQdrRiYKnsdsJiD"
      //   let params = { transactionID }

      //   wx.BaaS.order(params).then(res => {
      //     // 注: 只要是服务器有返回的情况都会进入 success，这是微信的处理方式与 BaaS 服务(器)无关
      //     console.log(res)
      //   }, err => {
      //     // 注：只有发生网络异常等其他系统级别的错误才会进入这里
      //     console.log(err)
      //   })

      // }, err => {
      //   // err
      // })
  },
  globalData: {
    //默认设备iPhone6
    windowWidth:375,
    windowHeight:603,
    language:"zh_CN",

    //用户信息
    userID: null,
    userObject:null,//{"nickName":"","avatarUrl":"../../static/image/baby.jpg"}, //null,
    handleStatus:false,
    //绑定个人信息
    bindPersonStatus:false,
    uID:"0",
    personObject:null,
    paystatus:false,
    paytime:null,
    membertype:"0",
    bind_count:2,
    search_count:5,
    //数据库表格
    orderTable:49813,
    agentTable:49812,
    userTable:49806,
    typeTable:49761,
    fllzContent :1535705352641453,
  }
})