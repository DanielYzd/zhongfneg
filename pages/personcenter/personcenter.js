// pages/personcenter/personcenter.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    src: '',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  view: function (e) {
    wx.navigateTo({
      url: '/packageC/pages/personinfo',
    })
  },
  jump: function (e) {
    console.log(e)
    if (e.currentTarget.dataset.index === "0") {
      wx.navigateTo({
        url: '/packageD/pages/daily',
      })
    } else if (e.currentTarget.dataset.index === "1") {
      wx.navigateTo({
        url: '/packageD/pages/totalrecord',
      })
    } else if (e.currentTarget.dataset.index === "2") {
      wx.navigateTo({
        url: '/packageD/pages/checkrecord',
      })
    } else {
      wx.navigateTo({
        url: '/packageC/pages/step1',
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData.userInfo)
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      app.getUserInfo().then(res => {
        console.log(res)
        app.globalData.userInfo = res.userInfo
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      })
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      app.getUserInfo().then(res => {
        console.log(res)
        app.globalData.userInfo = res.userInfo
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      })
    }
  },
  getUserInfo: function (e) {
    console.log(e)
    if (e.detail.userInfo) {
      app.globalData.userInfo = e.detail.userInfo
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
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