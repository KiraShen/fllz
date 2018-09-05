// pages/index/cert.js
import utils from '../../utils/util'
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    cert:{},
    id:"",
    ID:"",
    aID:"",
    tID:"",
    uID:"",
    created_at:0,
    updated_at:0,
    time:"",
    bankflow:"",
    certID:"",
    name:"",
    shares:0,
    agent:"",
    idcard:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.setNavigationBarTitle({
      title: '查询结果'
    })
    wx.getStorage({
      key: 'cert_serch_result',
      success: function(res) {
        console.log(res.data)
        that.setData({
            // cert:res.data,
            id:res.data[0].id,
            ID:res.data[0].ID,
            aID:res.data[0].aID,
            tID:res.data[0].tID,
            uID:res.data[0].uID,
            created_at:res.data[0].created_at,
            updated_at:res.data[0].updated_at,
            time:res.data[0].time.substring(0,10),
            bankflow:res.data[0].bankflow,
            certID:res.data[0].certID
        })
      },
      fail:function(){
        console.log("get storage fail.")
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this
    console.log(this.data.uID)
    console.log(this.data.aID)
    console.log(this.data.tID)
    console.log("getting user.agent.type...")
    utils.getUser(this.data.uID, (res) => {
      if(res.data.objects.length > 0){
        console.log("get user successful.")
        this.setData({
          name:res.data.objects[0].name,
          idcard:res.data.objects[0].idcard
        })
      }else{
        console.log("get user no result.")
        //error
      }
    })

    utils.getType(this.data.tID, (res) => {
      if(res.data.objects.length > 0){
        console.log("get type successful.")
        this.setData({
          shares:res.data.objects[0].shares
        })
      }else{
        console.log("get type no result.")
        //error
      }
    })

    utils.getAgent(this.data.aID, (res) => {
      if(res.data.objects.length > 0){
        console.log("get agent successful.")
        this.setData({
          agent:res.data.objects[0].agent_name
        })
      }else{
        console.log("get agent no result.")
        //error
      }
    })


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
    console.log("cert html unload...")
    wx.removeStorage({
    key: 'cert_serch_result',
      success: function(res) {
        console.log(res.data)
      } 
    })
  },

})