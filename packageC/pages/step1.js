// packageC/pages/step1.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [{
      name: '男',
      value: 0,
      checked: false,
    },
    {
      name: '女',
      value: 1,
      checked: false
    }
    ],
    step1: {
      address: "",
      concontactphone: "",
      doctorname: "",
      hospital: "",
      oldyear: "",
      patientno: "",
      sex: 1,
      username: "",
      contactperson: ""
    }
  },
  bindFormSubmit: function (e) {
    wx.setStorage({
      data: e.detail.value,
      key: 'step1',
    })
    wx.navigateTo({
      url: '/packageC/pages/step2',
    })
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
      Object.keys(this.data.step1).forEach(key => {
        this.data.step1[key] = message[key]
        tmp = this.data.step1
      })
      this.setData({
        step1: tmp
      })
    }else{
        //如果不存在id，则先从缓存拿数据，拿不到则取data中的默认值。
      wx.getStorage({
        key: 'step1',
      }).then(res => {
        this.setData({
          step1: res.data
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