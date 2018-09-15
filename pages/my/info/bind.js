// pages/my/bind.js
import utils from '../../../utils/util'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '绑定信息'
    })
    let that = this
    wx.getStorage({
      key: 'bind_user_info',
      success: function(res) {
        console.log("get user info success.",res)
          let count = res.data.uID_array.length
          console.log("current count.",count)
          if(res.data.bind_count > count){
            console.log("ok to bind,now bind count:",res.data.bind_count)    
          }else{
            console.log("over bind num")
            wx.showModal({
              content: "对不起，你绑定数量已经上线，请开通更高级会员",
              showCancel: false,
              success: function (res) {
                if (res.confirm) {
                  console.log('openAlert ok.')
                }
                wx.navigateBack();
              }
            });
          }
      },
      fail:function(){
        wx.showModal({
          content: "网络出错了，退出重试吧",
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              console.log('openAlert ok.')
            }
            wx.navigateBack();
          }
        });
      }
    })
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

          utils.updateMyUserUIDArray(res.data.objects[0].ID,(res)=>{
            console.log("updateMyUserUIDArray ssuccess")
          },(res)=>{
            console.log("updateMyUserUIDArray defeat") 
          })

          wx.setStorage({
            key:"bind_person_info",
            data:res.data.objects[0]
          })
          wx.showToast({
              title: '绑定成功',
              icon: 'success',
              success:function(){
                setTimeout(function () {
                  utils.getWxUserInfo(app.globalData.userID, (ress) => {
                    console.log("user info:" ,ress.data.objects[0])
                    let bufObject = ress.data.objects[0]
                    wx.setStorage({
                      key:"bind_user_info",
                      data:bufObject
                    })
                  })
                }, 800)
              },
            complete:function(){
              wx.navigateBack()
            }
          })
        }else{
          console.log("get cert no result.")
          this.openAlert('未查询到身份证结果,请反馈你的信息...')
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