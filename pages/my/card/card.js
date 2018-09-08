// pages/my/card/card.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl:"../../../static/image/baby.jpg",
    name:"",
    cardname:"普通会员",
    cardstatus:"0",
    time:"永久"
  },

  openMembership:function(){
    wx.navigateTo({
      url: 'pay'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    wx.setNavigationBarTitle({
      title: '我的会员'
    })
    
    if(!app.globalData.bindPersonStatus){
      wx.showModal({
        content: "个人信息为空，请先去\"我的信息\"中设置个人信息",
        showCancel: false,
        success: function (res) {
            if (res.confirm) {
              console.log('openAlert ok.')
              wx.redirectTo({
                url: '../info/bind'
              })
            }
        }
      });
    }else{
      let str = app.globalData.paytime.substr(0,10)
      let m = "会员"
      switch(app.globalData.membertype){
        case "1":m = "白银会员"; break;
        case "2":m = "黄金会员"; break;
        case "3":m = "白金会员"; break;
        default: m = "普通会员"
      }
      // let date =  that.formatDate(str);
      that.setData({
        avatarUrl:app.globalData.userObject.avatarUrl,
        name:app.globalData.personObject.name,
        time:str,
        cardname:m
      })
      // console.log("user card status",app.globalData.membertype)
      // console.log("user card time",date.setYear(date.getYear() + 1))
    }
  },

  // formatDate:function(value) {
  //   var date = new Date(value).format("yyyy-MM-dd HH:mm");
  //   return date;
  // },

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