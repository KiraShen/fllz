// pages/my/bind.js
import utils from '../../../utils/util'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bindStatus:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '绑定信息'
    })
    let that = this
  },

  formSubmit: function(e) {
    let that = this
    let MyUser = new wx.BaaS.User()
    console.log('form submit...', e.detail.value.input)
    let idcardBufLen = e.detail.value.input.length
    let idcardstr = e.detail.value.input
    if(idcardBufLen != 18){
      that.openAlert('请输入正确的身份证号...')
    }else{
      idcardstr = idcardstr.replace(/X/g, 'x')
      utils.getIDCard(idcardstr, (res) => {
        if(res.data.objects.length > 0){
          console.log("get user successful.",res.data.objects)
          app.globalData.bindPersonStatus = true
          app.globalData.uID = res.data.objects[0].ID
          app.globalData.personObject = res.data.objects[0]

          //微信用户绑定身份证
          let currentUser = MyUser.getCurrentUserWithoutData()
          currentUser.set('uID', res.data.objects[0].ID).update().then(res => {
            console.log("bind success")
          }, err => {
            // err
          })
          
          wx.setStorage({
            key:"bind_person_info",
            data:res.data.objects[0]
          })
          that.openToast()
          wx.navigateBack()
        }else{
          console.log("get cert no result.")
          this.openAlert('未查询到身份证结果,请等待数据上传...')
        }
      })
    }
  },

  formReset: function() {
    console.log('form reset...')

  },

  openAlert: function (str) {
    console.log('openAlert...')
    var that = this
    wx.showModal({
        content: str,
        showCancel: false,
        success: function (res) {
            if (res.confirm) {
              console.log('openAlert ok.')
              that.formReset()
            }
        }
    });
  },

  openToast: function () {
    wx.showToast({
        title: '绑定成功',
        icon: 'success',
        duration: 1500
    });
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