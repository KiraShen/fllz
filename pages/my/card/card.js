// pages/my/card/card.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl:"../../../static/image/baby.jpg",
    cardName:"普通会员",
    payTime:"今天",
    deadTime:"永久",

    orderShow:"不可以",
    searchCount:"2",
    bindCount:"1"
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
    
    wx.getStorage({
      key: 'bind_user_info',
      success: function(res) {
        console.log("get user info success.",res)
        // let date = res.data.paytime.getFullYear()+1
        let m = "普通会员"
        let s = 2;
        if(res.data.paystatus){
          switch(res.data.membertype){
            case "1":m = "白银会员"; s = 5;break;
            case "2":m = "黄金会员"; s = 10;break;
            case "3":m = "白金会员"; s = 20;break;
            default: m = "普通会员"
          }
          that.setData({
            payTime:res.data.paytime.substr(0,10),
            deadTime:'2019'+ res.data.paytime.substr(4,6),
            cardName:m,
            bindCount:res.data.bind_count,
            searchCount:s,
            orderShow:"可以"
          })
        }

      },
      fail:function(){
        console.log("get storage fail.")
        // wx.showModal({
        //   content: "网络出错...请检查网络",
        //   showCancel: false,
        //   success: function (res) {
        //     if (res.confirm) {
        //       console.log('openAlert ok.')
        //     }
        //   }
        // });
      }
    })

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