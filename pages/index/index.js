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
    contentObject:[],

    searchCount:0,
  },

   onPullDownRefresh: function(){
    wx.stopPullDownRefresh()
    this.onFresh()
    //设置时间防止多次刷新
  },

  onLoad: function () {
    let that = this
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
    wx.getStorage({
      key: 'bind_user_info',
      success: function(res) {
        console.log("get user info success.",res.data)
        that.setData({
          searchCount:res.data.search_count
        })
      },
      fail:function(res){
        console.log("none")
      }
    })

    //自动下拉刷新
    wx.startPullDownRefresh()

    //重置新的searchCount

    //

  },

  onShow:function(){
    let that = this

    // wx.getStorage({
    //   key: 'bind_user_info',
    //   success: function(res) {
    //     console.log("get user info success.",res.data)
    //     that.setData({
    //       searchCount:res.data.search_count
    //     })
    //   }
    // })
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
      if(!app.globalData.bindPersonStatus){ 
          wx.showModal({
            content: "个人信息为空，请先去\"我的信息\"中设置个人信息",
            showCancel: false,
            success: function (res) {
                if (res.confirm) {
                  console.log('openAlert ok.')
                  wx.navigateTo({
                    url: '../my/info/bind'
                  })
                }
            }
          });
      }else{
        this.setData({
            inputShowed: true
        });        
      }

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
    let that = this

    console.log(this.data.inputVal)
    if(this.data.searchCount <= 0){
      console.log("search count none",this.data.searchCount)
      that.openAlert('抱歉,你已经超出今天查询上限,请开通会员再来尝试吧...')
    }else if(this.data.inputVal.length > 0){
      utils.getCert(this.data.inputVal, (res) => {
        if(res.data.objects.length > 0){
          console.log("get cert successful.")
          wx.setStorage({
            key:"cert_serch_result",
            data:res.data.objects,
            success:function(){
              //查询次数减一
              let bufCount = 0
              if(that.data.searchCount > 0){bufCount = that.data.searchCount - 1}
              utils.updateMyUserInfo(bufCount,'search_count',(res)=>{
                console.log("update search_count ok.")
              })
              that.setData({
                searchCount:bufCount
              })
            }
          })
          //
          this.hideInput()
          wx.navigateTo({
            url: 'cert'
          })
        }else{
          console.log("get cert no result.")
          this.openAlert('抱歉,没有查到您的信息,请检查你的输入(字母大写哦!)...')
        }
      })
    }else{

    }
  },
  openAlert: function (str) {
    console.log('openAlert...')
    var that = this
    wx.showModal({
        content: str,
        showCancel: false,
        success: function (res) {
            if (res.confirm) {
              console.log('openalert ok.')
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
