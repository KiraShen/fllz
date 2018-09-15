// pages/my/binding/binding.js
import utils from '../../../utils/util'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    allPersonInfo:null,
    allPersonInfoBuf:null,
    personInfoStatus:false,
    currentUID:"0",
    bindCount:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this    
    wx.setNavigationBarTitle({
      title: '绑定列表'
    })
    wx.getStorage({
      key: 'bind_user_info',
      success: function(res) {
        let uIDArray = res.data.uID_array
        let uID = res.data.uID
        utils.getAllUser(uIDArray,(res)=>{
          console.log("all person",res.data.objects)
          if(res.data.objects.length > 0){
            for (var i = res.data.objects.length - 1; i >= 0; i--) {
              if(res.data.objects[i].ID == uID){
                res.data.objects[i].checked = true
              }else{
                res.data.objects[i].checked = false
              }
            }
            // console.log("person all:",res.data.objects)
            that.setData({
              allPersonInfo:res.data.objects,
              allPersonInfoBuf:res.data.objects,
              personInfoStatus:true,
              currentUID : uID
            })
          }else{
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
          }
          
        })                       
      },
      fail: function(res){
        console.log("Login Error.")
        utils.openAlert("Login Error.")
      } 
    })
  },

  radioChange: function(e) {
    let that = this 
    app.globalData.uID = e.detail.value
    // console.log('radio change', e.detail.value)
    utils.getUser(e.detail.value, (res) => {
      console.log("change bind user info",res.data.objects)
      let bufObject = res.data.objects[0]
      wx.setStorage({
        key:"bind_person_info",
        data:bufObject
      })
      let bufInfo = that.data.allPersonInfo
      for (var i = bufInfo.length - 1; i >= 0; i--) {
        if(bufInfo[i].ID == e.detail.value){
          bufInfo[i].checked = true
        }else{
          bufInfo[i].checked = false
        }
      }
      that.setData({
        currentUID:e.detail.value,
        allPersonInfo:bufInfo
      })
      // console.log("buf",that.data.allPersonInfo)
    })

    utils.updateMyUserInfo(e.detail.value,'uID',(res)=>{
      console.log(" Update Success")
      utils.getWxUserInfo(app.globalData.userID, (ress) => {
        console.log("user info:" ,ress.data.objects[0])
        let bufObject = ress.data.objects[0]
        wx.setStorage({
          key:"bind_user_info",
          data:bufObject
        })
      })
    },(err)=>{
      console.log(" Update Error")
    })


  },

  addMore:function(){
    let that = this
    wx.getStorage({
      key: 'bind_user_info',
      success: function(res) {
        console.log("get user info success.",res)
        let count = res.data.uID_array.length
        console.log("current count.",count)
        if(res.data.bind_count > count){
          console.log("ok to bind")    
          wx.redirectTo({
            url: '../info/bind'
          })
        }else{
          console.log("over bind num")
          wx.showModal({
            content: "对不起，你绑定数量已经上线，请开通更高级会员",
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                console.log('openAlert ok.')
              }
              wx.redirectTo({
                url: '../card/card'
              })
            }
          });
        }
      },
      fail:function(){
        console.log("get storage fail.")
        wx.showModal({
          content: "网络出错...请检查网络",
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              console.log('openAlert ok.')
            }
          }
        });
      }
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