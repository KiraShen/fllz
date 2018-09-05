// pages/index/details.js
const app = getApp()
var wxParser = require('../../wxParser/index.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    richText:null
  },

  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function (options) { 
    let that = this;
    let contentGroupID = app.globalData.fllzContent
    let MyContentGroup = new wx.BaaS.ContentGroup(contentGroupID)
    MyContentGroup.getContent(options.title).then(res => {
      console.log("content",res.data)
      let html = res.data.content;
      wxParser.parse({
        bind: 'richText',
        html: html,
        target: that,
        enablePreviewImage: false,
      })
      // that.setData({
      //   richText:res.data.content
      // })
    }, err => {
      // err
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

    console.log("show",this.title)
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