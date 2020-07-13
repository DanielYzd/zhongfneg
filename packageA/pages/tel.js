// packageA/pages/tel.js
import util from '../../utils/util'
import api from '../../utils/api'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    telArr1: [],
    telArr2: [],
    hiddenmodalput: true,
    phonea: ''
  },
  tel: function (e) {
    console.log(e)
    this.setData({
      phoneb: e.currentTarget.dataset.tel
    })
    this.setData({
      hiddenmodalput: !this.data.hiddenmodalput
    })

  },
  //取消按钮
  cancel: function () {
    this.setData({
      hiddenmodalput: true
    });
  },
  //确认
  confirm: function () {
    console.log(this.data.phonea)
    console.log(this.data.phoneb)
    let wechatno = wx.getStorageSync('loginInfo').openid
    let data = {
      phone_a: this.data.phonea,
      phone_b: this.data.phoneb,
      wechatno:wechatno
    }
    api.getData('api/phoneBill/BindPhonehw', 'POST', data).then(res => {
      console.log(res)
      if (res.statusCode === 200) {
        wx.setStorage({
          data: this.data.phonea,
          key: 'phone',
        })
        wx.makePhoneCall({
          phoneNumber: res.data,
          success: function () {
            console.log("成功拨打电话")
          },
        })
        this.setData({
          hiddenmodalput: true
        })
      }
    })
    
  },
  handleInputChange: function (e) {
    // 取出定义的变量名
    let targetData = e.currentTarget.dataset.modal;
    // 取出定义的变量名
    let currentValue = e.detail.value;
    this.setData({
      phonea: currentValue
    })
  },
  groupBy: function (data = [], field) {
    let result = {
      'default': []
    };
    data.forEach(item => {
      let group = item[field]
      console.log(group)
      if (group === '普通') {
        group = "putong"
      } else {
        group = "zhuanjia"
      }
      if (group) {
        if (!result[group]) {
          result[group] = []
        }
        result[group].push(item)
      } else {
        result['default'].push(item)
      }
    })
    return result
  },
  search: function () {
    api.getData('api/doctorDocoument/searchphone', 'GET').then(res => {
      console.log(res)
      console.log(this.groupBy(res.data, 'professional'))
      let result = this.groupBy(res.data, 'professional')
      this.setData({
        telArr1: result.zhuanjia,
        telArr2: result.putong
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.search()
    wx.getStorage({
      key: 'phone',
    }).then(res=>{
      console.log(res)
      this.setData({
        phonea:res.data
      })
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