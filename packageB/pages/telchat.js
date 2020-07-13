// packageB/pages/telchat.js
import api from '../../utils/api'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    telArr1: [],
    telArr2: []
  },

  // 查询所有医生
  getAlldoc:function(){
    api.getData('api/doctorDocoument/search','GET',{},{},true).then(res=>{
      console.log(res)
      this.setData({
        telArr1:res.data.content
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.type)
    this.getAlldoc()
    // if (options.type === "0") {
    //   this.setData({
    //     telArr1: [
    //       {
    //         department: "外科",
    //         dodoctname: "陈",
    //         hospital: "湘雅",
    //         id: 4,
    //         ismember: false,
    //         isonline: true,
    //         professional: "主任医师",
    //         sbarcode: "1f853708-d9b9-4c40-9623-3b4dbc14dfa9",
    //         sdate: "2020-06-17 17:53:17",
    //         telephone: "123445551120",
    //         wechatno: "ofISb5YC8MG3XC3_tAqiCWeuaKOk",
    //       }
    //     ]
    //   })
    // } else if (options.type === "1") {
     
    // } else {
  
    // }
  },
  tomessage:function(e){
    console.log(e)
    let item = JSON.stringify(e.currentTarget.dataset.item);

    wx.navigateTo({
      url: '/message/message?obj='+item,
    })
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