// packageD/pages/adddaily.js
import api from '../../utils/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['一天一次', '一天两次','一天三次'],
  },
  bindPickerChange: function (e) {
    console.log(e)
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },

  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })

  },
  bindTimeChange:function(e){
    this.setData({
      time: e.detail.value
    })
  },
  formSubmit: function (e) {
    console.log(e.detail.value)
    let data={
      medicine:e.detail.value.medicine,
      takingcycle:e.detail.value.takingcycle,
      clocktime:e.detail.value.datePicker+' '+e.detail.value.timePicker+':00'
    }
    console.log(data)
    api.getData('api/medRecord/add','POST',data).then(res=>{
      console.log(res)
      if(res.statusCode===201){
       wx.navigateTo({
         url: '../pages/daily',
       })
      }
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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