// packageC/pages/step2.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sportArray: [
      '每周运动≥3次',
      ' 每次中等强度及以上运动≥30分钟或从事中度体力劳动',
      ' 重度体力劳动视为经常有体育锻炼',
      '缺乏运动'
    ],
    sleepArray: [
      '睡眠质量非常高',
      '睡眠质量平平',
      '睡眠质量比较糟糕',
      '长期的睡眠不足，情绪不稳定'

    ],
    dietArray: [
      '饮食规律',
      '过食油腻食物',
      '辛辣',
      '咸食',
      '无'
    ],
    step2: {
      height: null,
      weight: null,
      bmi: 0,
      exercise:'',
      sleepquality:'',
      habit:'',
      smoking:false,
      wine:false,
      cerebralstroke:false,
      familyhis:false,
      bloodfat:false
    }
  },
  bindPickerChange_sports: function (e) {
    this.setData({
      index_sports: e.detail.value
    })
    var exercise = "step2.exercise"
    this.setData({
      [exercise]:this.data.sportArray[e.detail.value]
    })
  },
  bindPickerChange_sleep: function (e) {
    this.setData({
      index_sleep: e.detail.value
    })
    var sleepquality = "step2.sleepquality"
    this.setData({
      [sleepquality]:this.data.sleepArray[e.detail.value]
    })
  },
  bindPickerChange_diet: function (e) {
    this.setData({
      index_diet: e.detail.value
    })
    var habit = "step2.habit"
    this.setData({
      [habit]:this.data.dietArray[e.detail.value]
    })
  },
  inputFN1: function (e) {
    var height = "step2.height"
    this.setData({
      [height]: e.detail.value
    })
    var bmi = "step2.bmi"
    let value = this.data.step2.weight / (this.data.step2.height / 100) / (this.data.step2.height / 100)
    console.log(value)
    this.setData({
      [bmi]: value
    })
  },
  inputFN2: function (e) {
    var weight = "step2.weight"
    this.setData({
      [weight]: e.detail.value
    })
    var bmi = "step2.bmi"
    let value = this.data.step2.weight / (this.data.step2.height / 100) / (this.data.step2.height / 100)
    this.setData({
      [bmi]: value.toFixed(1)
    })
  },
  formSubmit: function (e) {
    console.log(e)
    wx.setStorage({
      data: e.detail.value,
      key: 'step2',
    })
    wx.navigateTo({
      url: '/packageC/pages/step3',
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
      Object.keys(this.data.step2).forEach(key => {
        this.data.step2[key] = message[key]
        tmp = this.data.step2
      })
      this.setData({
        step2: tmp
      })
    }else{
        //如果不存在id，则先从缓存拿数据，拿不到则取data中的默认值。
      wx.getStorage({
        key: 'step2',
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