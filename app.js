import api from './utils/api.js'
import GoEasyIM from './geeasy/goeasy-im-1.0.7';
import {
  wxapi
} from './utils/wxapi.js'
App({

  //判断当前session是否有效
  // 登录态过期后开发者可以再调用 wx.login 获取新的用户登录态。调用成功说明当前 session_key 未过期，调用失败说明 session_key 已过期
  checkSession: function () {
  },
  goEasy: function (user) {
    let options = {
      host: "hangzhou.goeasy.io",
      appkey: "BC-19b527060cd242f7ad17e4a1c6b90442"
    };
    //初始化
    this.globalData.goEasy = GoEasyIM.getInstance(options)
    //建立连接
    let promise = this.globalData.goEasy.connect(user)
    promise.then(res => {
      console.log('Connect successful')
    }).catch(error => {
      console.log(error)
    })
    // // 测试发送消息
    // let username = wx.getStorageSync('loginInfo').name
    // if(!username){
    //   username="匿名患者"
    // }
    // let payload={
    //   username:username,
    //   message:'我是患者'
    // }
    // let message = this.globalData.goEasy.createMessage(payload);
    // let promise2 = this.globalData.goEasy.sendPrivateMessage('ofISb5YC8MG3XC3_tAqiCWeuaKOk',message);
    // promise2.then(res=>{
    //   console.log(res)
    // }).catch(error=>{
    //   console.log(error)
    // })
  },
  // login改为promise写法
  promiseLogin:function(){
    let promise = new Promise((resolve,reject)=>{
      wxapi('login').then(res=>{
        // console.log(res)
        return res
      }).then(res=>{
        console.log(res)
        let data = {
          wxCode: res.code,
        }
        api.getData('api/paTient/wxLogin', 'GET', data,{},true).then(res=>{
          resolve(res)
        }).catch(error=>{
          reject(error)
        })
      })
    })
    return promise;
  },
  auth: function () {
    wxapi('getSetting').then(res => {
      if (res.authSetting['scope.userInfo']) {
        this.getUserInfo()
      }
    }).catch(error => {
    })
  },
  // Promise获取用户信息
  getUserInfo:function(){
    let promise = new Promise((resolve,reject)=>{
      wxapi('getUserInfo').then(res=>{
        console.log(res)
        resolve(res)
      }).catch(error=>{
        reject(error)
      })
    })
    return promise
  },
  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function () {
    this.auth()
    // let userInfo = wx.getStorageSync('loginInfo')
    // if (userInfo) {
    //   let user = {
    //     id:userInfo.openid
    //   }
    //   this.goEasy(user)
    // }
  },
  globalData: {
    userInfo: null,
    id:null,
    message:{},
    goEasy:null
  },
  /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow: function (options) {

  },

  /**
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide: function () {

  },

  /**
   * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
   */
  onError: function (msg) {

  }
})