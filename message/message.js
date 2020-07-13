// message/message.js
import GoEasyIM from '../geeasy/goeasy-im-1.0.7'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sendMessage: '',
    docno: '',
    scrollLast: '',
    docname:''
  },
  input: function (e) {
    console.log(e)
    this.setData({
      sendMessage: e.detail.value
    })
  },
  //患者发送消息，只需要用自己的wechatno
  send: function () {
    if (this.data.sendMessage) {
      let username = wx.getStorageSync('loginInfo').name
      let payload={
        username:username,
        message:this.data.sendMessage
      }
      let message = app.globalData.goEasy.createMessage(payload);
      let promise2 = app.globalData.goEasy.sendPrivateMessage(this.data.docno,message);
      promise2.then(res=>{
        console.log(res)
        this.gethistory()
        this.setData({
          sendMessage:''
        })
        //如果消息发送成功则保存这个医生信息到storage
        // wx.setStorageSync()
        let arr = wx.getStorageSync('docarr')
        console.log(arr)
        if(arr){
          let a = arr.findIndex(item=>item.docno===this.data.docno)
          console.log(a)
          if(a<0){
            arr.push({
              docno:this.data.docno,
              docname:this.data.docname
            })
            wx.setStorageSync('docarr', arr)
          }else{
            //如果存在a则更新缓存里面数据，避免医生修改个人信息，导致缓存不更新
          //  let obj = {
          //   docno:this.data.docno,
          //   docname:this.data.docname
          //  }
          //  arr[a]=obj
          //  console.log(arr)
          }
        }else{
          arr = []
          arr.push({
            docno:this.data.docno,
            docname:this.data.docname
          })
          wx.setStorageSync('docarr', arr)
        }
      }).catch(error=>{
        console.log(error)
      })
    } else {
      wx.showModal({
        content: '发送内容不能为空',
      })
    }

  },
  subscribe: function () {
    let that = this
    let onPrivateMessageReceived = function (message) {
      console.log(message)
      that.gethistory()
    };
    app.globalData.goEasy.on(GoEasyIM.EVENT.PRIVATE_MESSAGE_RECEIVED, onPrivateMessageReceived)
  },
  //获取私聊历史消息
  gethistory: function () {
    let option = {
      friendId: this.data.docno,
      limit: 30
    }
    let promise = app.globalData.goEasy.history(option)
    promise.then(res => {
      console.log(res)
      let all = res.content.map(item => {
        if (item.senderId == this.data.docno) {
          return ({
            time: item.timestamp,
            content: item.payload.message,
            type: 'accept'
          })
        } else {
          return ({
            time: item.timestamp,
            content: item.payload.message,
            type: 'send'
          })
        }

      })
      this.setData({
        all: all
      })
      this.setData({
        scrollLast: 'item' + (this.data.all.length - 1)
      })
    }).catch(err => {
      console.log(res)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let item = JSON.parse(options.obj)
    console.log(item)
    wx.setNavigationBarTitle({
      title: item.dodoctname + '主任医师',
    })
    this.setData({
      docno: item.wechatno
    })
    this.setData({
      docname:item.dodoctname
    })
    this.gethistory()
    this.subscribe()
    // this.getAllhistory()
    // this.sendhistory()
    // this.accepthistory()
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