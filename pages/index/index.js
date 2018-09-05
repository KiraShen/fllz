//index.js
//获取应用实例
import utils from '../../utils/util'
const app = getApp()

Page({
  data: {
    //用户信息数据
    userInfo: {},
    userID:null,
    hasUserInfo: false,
    //搜索框数据
    inputShowed: false,
    inputVal: "",
    //列表数据
    contentObject:[]
  },

   onPullDownRefresh: function(){
    wx.stopPullDownRefresh()
    this.onFresh()
    //设置时间防止多次刷新
  },

  onLoad: function () {
    wx.setNavigationBarTitle({
      title: '首页'
    })
    //获取用户信息
    if (app.globalData.userObject) {
      this.setData({
        userInfo: app.globalData.userObject,
        userID:app.globalData.userID,
        hasUserInfo: true
      })
    }else {
      // utils.openAlert("Login Error.")
    }
    //自动下拉刷新
    wx.startPullDownRefresh()

  },

  onShow:function(){
    let that = this

  },

  onReady:function(){

  },

  onHide:function(){
    this.hideInput()
  },


  onFresh:function(){
    let contentGroupID = app.globalData.fllzContent
    let MyContentGroup = new wx.BaaS.ContentGroup(contentGroupID)
    let query = new wx.BaaS.Query()
    query.arrayContains('categories', [1535705487760113])
    MyContentGroup.setQuery(query).find().then(res => {
      console.log("get contents success,list:",res.data.objects)
      this.setData({
        contentObject:res.data.objects
      })
    },err=>{

    })
  },

  showInput: function () {
      this.setData({
          inputShowed: true
      });
  },
  hideInput: function () {
      this.setData({
          inputVal: "",
          inputShowed: false
      });
  },
  clearInput: function () {
      this.setData({
          inputVal: ""
      });
  },
  inputTyping: function (e) {
      this.setData({
          inputVal: e.detail.value
      });
  },
  inputConfirm:function(e){
    console.log(this.data.inputVal)
    if(this.data.inputVal.length > 0){
      utils.getCert(this.data.inputVal, (res) => {
        if(res.data.objects.length > 0){
          console.log("get cert successful.")
          wx.setStorage({
            key:"cert_serch_result",
            data:res.data.objects
          })
          this.hideInput()
          wx.navigateTo({
            url: 'cert'
          })
        }else{
          console.log("get cert no result.")
          this.openAlert()
        }
      })
    }
  },
  openAlert: function () {
    console.log('openAlert...')
    var that = this
    wx.showModal({
        content: '抱歉,没有查到您的信息,请等待数据上传...',
        showCancel: false,
        success: function (res) {
            if (res.confirm) {
              console.log('openAlert ok.')
              that.hideInput()
            }
        }
    });
  },
  openLoading: function () {
    console.log('openLoading...')
        wx.showToast({
            title: '查询中',
            icon: 'loading',
            duration: 3000
        });
    }
})
