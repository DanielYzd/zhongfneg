//index.js
//获取应用实例
let api = require('../../utils/api.js')
import util from '../../utils/util'
import * as echarts from '../../ec-canvas/echarts';
const app = getApp()
import GoEasyIM from '../../geeasy/goeasy-im-1.0.7';
Page({
  data: {
    imgs: [],
    newsData: [],
    indeximgs: [],
    title:{
      text: '60分',
      subtext: '添加新纪录',
      x: 'center',
      y: 'center',
      textStyle: {
        fontSize: 40,
        fontStyle:'oblique',
        fontWeight: 'bold',
        color: '#3271FF',
      },
      subtextStyle: {
        color:'#3367EB',
        fontSize: 14,
        fontWeight: '300',
        fontStyle:'oblique',
        fontFamily:'monospace'
      }
    },
    series: [{
      name: 'Line 1',
      type: 'pie',
      clockWise: true,
      radius: ['75%', '85%'],
      itemStyle: {
        normal: {
          label: {
            show: false
          },
          labelLine: {
            show: false
          }
        }
      },
      hoverAnimation: false,
      data: [
        {
          value: 60,
          itemStyle: {
            normal: {//颜色渐变
                color: new echarts.graphic.LinearGradient(
                    0, 0, 0, 1,
                    [
                        {offset: 0, color: '#3367EB'},
                        {offset: 0.5, color: '#73A8F7'},
                        {offset: 1, color: '#97CCFD'}
                    ]
                )
            }
        }
        }, {
          value:40,
          itemStyle:{
            color:'#cdcdcd'
          }
        }
      ]
    }],
    ec: {
      lazyLoad: true
    }
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  jump: function (e) {
    console.log(e)
  },
  addnew: function (e) {
    console.log(e)
    wx.navigateTo({
      url: '/packageA/pages/record',
    })
  },
  //首页四个图片跳转
  tabjump: function (e) {
    if (e.currentTarget.dataset.index === 0) {
      wx.navigateTo({
        url: '/packageA/pages/tel',
        success: function () {
          console.log('success')
        }
      })
    } else if (e.currentTarget.dataset.index === 1) {
      wx.navigateTo({
        url: '/packageA/pages/record',
        success: function () {
          console.log('success')
        }
      })
    } else if (e.currentTarget.dataset.index === 2) {
      wx.navigateTo({
        url: '/packageB/pages/region',
        success: function () {
          console.log('success')
        }
      })
    } else {
      wx.makePhoneCall({
        phoneNumber: '18958193466',
        success: function () {
          console.log("成功拨打电话")
        },
      })
    }

  },
  //查询所有新闻
  search: function () {
    api.getData('api/newsRecord/serach', 'GET').then(res => {
      console.log(res)
      this.setData({
        newsData: res.data.content,
      })
    })
  },
  refresh:function(){
    this.searchevaluationMessage()
  },
  //查看个人消息
  // api/evaluationMessage/search
  searchevaluationMessage: function () {
    api.getData('api/evaluationMessage/search?sort=id,desc', 'GET').then(res => {
      console.log(res)
      if(res.data.content.length>0){
        //更新storage里面添加用户名字
        let user = {
          openid:res.data.content[0].wechatno,
          id:res.data.content[0].wechatno,
          name:res.data.content[0].username
        }
        wx.setStorageSync('loginInfo',user )
        app.globalData.id=res.data.content[0]['id']
        console.log(app.globalData.id)
       
        app.globalData.message=res.data.content[0]
        wx.setStorage({
          data: res.data.content[0],
          key: 'message',
        })
        let grade = res.data.content[0]['grade']
        let grade2 = 100- grade;
        this.setData({
         'title.text':grade+'分',
         'series[0].data[0].value':grade,
         'series[0].data[1].value':grade2,

        })
        console.log(this.data.series)
        
      }
      app.goEasy(wx.getStorageSync('loginInfo'))
      this.echartsComponnet = this.selectComponent('#mychart');
      this.init_echarts()
    })
  },
  init_echarts: function () {
    const getPixelRatio = () => {
      let pixelRatio = 0
      wx.getSystemInfo({
        success: function (res) {
          pixelRatio = res.pixelRatio
        },
        fail: function () {
          pixelRatio = 0
        }
      })
      return pixelRatio
    }
    // console.log(pixelRatio)
    var dpr = getPixelRatio()
    this.echartsComponnet.init((canvas, width, height) => {
      // 初始化图表
      const Chart = echarts.init(canvas, null, {
        width: width,
        height: height,
        devicePixelRatio:dpr
      });
      Chart.setOption(this.getOption());
      // 注意这里一定要返回 chart 实例，否则会影响事件处理等
      return Chart;
    });
  },
  getOption: function () {
    var option = {
      color: ['#4072ED', '#E2EDFF',],
      title: this.data.title,
      series: this.data.series
    }
    return option;
  },
  //查看新闻详情
  viewNews: function (e) {
    console.log(e.currentTarget.dataset.content)
    wx.navigateTo({
      url: '/viewsDetail/viewsDetail?content=' + JSON.stringify(e.currentTarget.dataset.content),
    })
  },
  viewList: function (e) {
    wx.navigateTo({
      url: '/viewsDetail/viewslist',
    })
  },
  goEasy: function (user) {
    let options = {
      host: "hangzhou.goeasy.io",
      appkey: "BC-19b527060cd242f7ad17e4a1c6b90442"
    };
    //初始化
    app.globalData.goEasy = GoEasyIM.getInstance(options)
    //建立连接
    console.log(222)
    let promise = app.globalData.goEasy.connect(user)
    console.log(promise)
    promise.then(res => {
      console.log('Connect successful')
    }).catch(error => {
      console.log(error)
    })
  },

  onLoad: function () {
    this.setData({
      imgs: util.homeImages,
      indeximgs: util.indexImages
    });
    app.promiseLogin().then(res => {
      console.log(res)
      let user = {
        id:res.data.openid,
        name:'匿名患者',
        openid:res.data.openid
      }
      wx.setStorageSync('loginInfo', user)
      this.search()
      this.searchevaluationMessage()
    }).catch(error => {
      wx.showModal({
        title: '获取用户失败',
      })
      this.echartsComponnet = this.selectComponent('#mychart');
      this.init_echarts()
    })
  },

})
