// pages/my/my.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //icon
    iconSet:"../../static/icon/set.png",
    iconOrder:"../../static/icon/order.png",
    iconInfo:"../../static/icon/myi.png",
    iconEmoji:"../../static/icon/emoji.png",
    iconMsg:"../../static/icon/msg.png",
    //url
    urlInfo:"info/info",
    urlOrder:"order/order",
    urlSet:"set/set",
    urlFeedback:"feedback/feedback",
    urlCard:"card/card",
    //绑定用户信息数据
    handleStatus:app.globalData.handleStatus,
    avatarUrl:"../../static/image/baby.jpg",//app.glogbalData.userObject.avatarUrl, //"../../static/image/baby.jpg",
    nickName:"", //app.glogbalData.userObject.nickName, //"",
    //
    bindStatus:false,
    name:"",
    idcard:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    wx.setNavigationBarTitle({
      title: ''
    })
  },

  userInfoHandler(data) {
    let that = this
    wx.BaaS.handleUserInfo(data).then(res => {
      console.log("handle user info...",res)
      app.globalData.userObject = res
      app.globalData.handleStatus = true
      this.setData({
        handleStatus:true,
        avatarUrl:res.avatarUrl,
        nickName: res.nickName
      })
    }, res => {
      this.setData({
        handleStatus:false
      })
      // **res 有两种情况**：用户拒绝授权，res 包含基本用户信息：id、openid、unionid；其他类型的错误，如网络断开、请求超时等，将返回 Error 对象（详情见下方注解）
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})