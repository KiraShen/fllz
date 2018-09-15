// pages/my/order/order.js
import utils from '../../../utils/util'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order:{},
    name:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    var oObject,aObject,tObject = null
    wx.setNavigationBarTitle({
      title: '我的订单'
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
      //utils.openAlert("个人信息为空，请先去\"我的信息\"中设置个人信息")
    }else if(!app.globalData.payStatus){
      wx.showModal({
        content: "没有开通高级会员，请先去\"我的会员卡\"中开通高级会员",
        showCancel: false,
        success: function (res) {
            if (res.confirm) {
              console.log('openAlert ok.')
              wx.redirectTo({
                url: '../card/card'
              })
            }
        }
      });
    }else{
      console.log("user:",app.globalData.userObject)
      utils.getOrder(app.globalData.uID, (res) => {
        console.log("get order successful.",res.data.objects)
        oObject = res.data.objects
        var aID = res.data.objects.map(function(v){return v.aID;})
        var tID = res.data.objects.map(function(v){return v.tID;})
        aID = Array.from(new Set(aID))
        tID = Array.from(new Set(tID))
        console.log("aID",aID)
        console.log("tID",tID)
        utils.getAllAgent(aID,res=>{
          console.log("agent",res.data.objects)
          aObject = res.data.objects
        })

        utils.getAllType(tID,res=>{
          console.log("type",res.data.objects)
          tObject = res.data.objects
        })
      })

      wx.showLoading({
        title: '加载中',
        success:function(){
          setTimeout(function(){
            for (var i = oObject.length - 1; i >= 0; i--) {
              oObject[i].time = oObject[i].time.substr(0,10)
              for (var j = aObject.length - 1; j >= 0; j--) {
                if(oObject[i].aID==aObject[j].ID){
                  oObject[i].aID = aObject[j].agent_name
                  break
                }
              }
              for (var k = tObject.length - 1; k >= 0; k--) {
                if(oObject[i].tID==tObject[k].ID){
                  oObject[i].tID = tObject[k].type_name
                  oObject[i].uID = tObject[k].money
                  oObject[i].bankflow = tObject[k].shares
                  // oObject[i].push({"money":tObject[k].money})
                  break
                }
              }
            }
            wx.getStorage({
              key:'bind_person_info',
              success:function(res){
                that.setData({
                  order:oObject,
                  name:res.data.name
                })
              }
            })

            // console.log(oObject)
            wx.hideLoading()
          },2000)
        }
      })

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