// pages/my/info/info.js
import utils from '../../../utils/util'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //绑定的用户个人信息
    bindPersonStatus:app.globalData.bindPersonStatus,
    uID:"",
    name:"",
    idCard:"",
    address:"",
    bankCard:"",
    bankInfo:""

  },

  changeBindPerson:function(){
    wx.navigateTo({
      url: 'bind'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    wx.setNavigationBarTitle({
      title: '我的信息'
    })
    if(!app.globalData.bindPersonStatus){
      wx.navigateTo({
        url: 'bind'
      })
    }else{

    }
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
    let that = this
    wx.getStorage({
      key: 'bind_person_info',
      success: function(res) {
        console.log("get storage success.",res)
        that.setData({
            uID:res.data.ID,
            name:res.data.name,
            idCard:res.data.idcard,
            address:res.data.address,
            bankCard:res.data.bankaccount,
            bankInfo:res.data.bankinfo
        })
      },
      fail:function(){
        console.log("get storage fail.")
      }
    })
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