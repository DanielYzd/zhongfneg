// packageA/pages/record.js
import util from '../../utils/util'
import api from '../../utils/api'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    record:{
      sdate:'',
      fbs:0,
      diastolic:0,
      systolic:0,
      cardiac:0,
      bmi:0,
      bz:''
    },
  },
  formSubmit:function(e){
    console.log(1111)
    wx.redirectTo({
      url: '../pages/success'
    })
  },
  //按时间倒序查询最近一次记录
  afcsearch:function(){
    api.getData('api/afcMessage/search?sort=sdate,desc','GET').then(res=>{
      console.log(res)
      this.setData({
        record:res.data.content[0]
      })
    })
  },
  formSubmit:function(e){
    console.log(e)
    let data = e.detail.value;
    console.log(data)
    data.bmi=(data.weight / (data.height / 100) / (data.height / 100)).toFixed(1)
    console.log(data)
    api.getData('api/afcMessage/add','POST',data).then(res=>{
      console.log(res)
      // wx.redirectTo({
      //   url: './success',
      // })
      let data = res.data
      if(res.statusCode===200||res.statusCode===201){
        wx.navigateTo({
          url: './success',
          events: {
            // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
            acceptDataFromOpenedPage: function(data) {
              console.log(data)
            },
          },
          success: function(res) {
            // 通过eventChannel向被打开页面传送数据
            res.eventChannel.emit('acceptDataFromOpenerPage', data)
          }
        })
      }else{
        wx.showToast({
          title: '提交失败',
          icon:'none'
        })
      }
   
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.afcsearch()
    // console.log(new Date())
    // let date = new Date()
    // let now = util.formatTime(date)
    // console.log(now)
    // this.setData({
    //   time:now
    // })
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