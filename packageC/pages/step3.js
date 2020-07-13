// packageC/pages/step3.js
import api from '../../utils/api'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    step3:{
      fbs:'',
      diastolic:'',
      systolic:'',
      cardiac:'',
      remarks:'',
      othermedical:''
    }
  },
  formSubmit:function(e){
    console.log(e)
   e.detail.value.othermedical=e.detail.value.othermedical.toString()
    wx.setStorage({
      data:  e.detail.value,
      key: 'step3',
    })
    let body = {}
    wx.getStorage({
      key: 'step1',
    }).then(res=>{
      // 
       body = Object.assign(body,res.data)
      wx.getStorage({
        key: 'step2',
      }).then(res=>{
        body = Object.assign(body,res.data)
        wx.getStorage({
          key: 'step3',
        }).then(res=>{
          body = Object.assign(body,res.data)
          console.log(body)
          api.getData('api/evaluationMessage/add','POST',body).then(res=>{
            console.log(res)
            if(res.statusCode==201){
              wx.showToast({
                title: '提交成功',
              })
              // wx.switchTab({
              //   url: '/pages/index/index',
              // })不刷新
              // wx.redirectTo({
              //   url: '/pages/index/index',
              // })tarbar不支持
              wx.reLaunch({
                url: '/pages/index/index',
              })
            }else{
              wx.showModal({
                title: '提交失败',
                content:'请联系管理员'
              })
            }
          }).catch(error=>{
            console.log(error)
          })
        })
      })
    }).catch(error=>{
      console.log(error)
    })
    // wx.navigateTo({
    //   url: '/packageA/pages/success',
    // })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id =app.globalData.id
    //如果存在id，则从全局message拿到需要回显的数据
    if(id){
      let message = app.globalData.message
      let tmp
      Object.keys(this.data.step3).forEach(key => {
        this.data.step3[key] = message[key]
        tmp = this.data.step3
      })
      this.setData({
        step3: tmp
      })
    }else{
        //如果不存在id，则先从缓存拿数据，拿不到则取data中的默认值。
      wx.getStorage({
        key: 'step3',
      }).then(res => {
        this.setData({
          step3: res.data
        })
      }).catch(error => {
        console.log(error)
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