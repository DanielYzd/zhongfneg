// packageD/pages/totalrecord.js
import * as echarts from '../../ec-canvas/echarts';
import api from '../../utils/api'
// function getOption(xData, data_cur, data_his) {
//   var option = {
//     color:['#3DC73A','#FFA313'],
//     xAxis: {
//         type: 'category',
//         data: ['5.30', '5.31', '6.1', '6.2'],
//         axisLine:{
//           show:false,
//         }
//     },
//     yAxis: {
//         type: 'value',
//         show: true,
//         axisLine:{
//           show:false
//         }

//     },
//     series: [{
//         data: [90, 40, 60, 20],
//         type: 'line',
//         smooth: true
//     }]
// };
//   return option;
// }
// let chartLine;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    list: [],
    ec: {
      lazyLoad: true
    },
    daycount: 3,
    array: [3, 7, 15],
    index: 0,
    xAxis: {
      type: 'category',
      data: [],
      axisLine: {
        show: false,
      }
    },
    series1: [{
              data: [],
              type: 'line',
              smooth: true
          }],
    series2: [{
              data: [],
              type: 'line',
              smooth: true
          },{
            data: [],
            type: 'line',
            smooth: true
        }],
    series3: [{
              data: [],
              type: 'line',
              smooth: true
          }],
    series4: [{
              data: [],
              type: 'line',
              smooth: true
          }],
  },
  switchTab(e) {
    console.log(e)
    this.setData({ currentTab: parseInt(e.currentTarget.dataset.current) });
    if (this.data.currentTab === 0) {
      this.search()
    } else {
      this.searchmore()
    }
  },
  init_echarts: function (index) {
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
        devicePixelRatio: dpr
      });
      Chart.setOption(this.getOption(index));
      // 注意这里一定要返回 chart 实例，否则会影响事件处理等
      return Chart;
    });
  },
  getOption: function (index) {
    let series
    if(index==1){
      series = this.data.series1
    }else  if(index==2){
      series = this.data.series2
    }else  if(index==3){
      series = this.data.series3
    }else{
      series = this.data.series4
    }
    var option = {
      color: ['#3DC73A', '#FFA313'],
      xAxis: this.data.xAxis,
      yAxis: {
        type: 'value',
        show: true,
        axisLine: {
          show: false
        }

      },
      series:series
    }
    return option;
  },
  bindPickChange: function (e) {
    console.log(e.detail.value)
    this.setData({
      index: e.detail.value
    })
    this.searchmore()
  },
  jump: function (e) {
    wx.navigateTo({
      url: '/packageA/pages/record',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  //获取所有记录
  search: function () {
    api.getData('api/afcMessage/search?sort=sdate', 'GET').then(res => {
      console.log(res)
      this.setData({
        list: res.data.content
      })
    })
  },
  //获取默认三天曲线
  searchmore: function () {
    let daycount = this.data.array[this.data.index]
    api.getData(`api/afcMessage/searchmore?daycount=${daycount}`).then(res => {
      console.log(res)
    if(res.data.bmis){
      let xAxis = res.data['bmis'].map(item=>{
        return item.sdate
      })
      let fbs = res.data['fbss'].map(item=>{
        return item.fbs
      })
      let diastolics = res.data['diastolics'].map(item=>{
        return item.diastolic
      })
      let systolic =res.data['systolic'].map(item=>{
        return item.systolic
      })
      let cardiac = res.data['cardiac'].map(item=>{
        return item.cardiac
      })
      let bmis = res.data['bmis'].map(item=>{
        return item.bmi
      })
      
      this.setData({
        'xAxis.data':xAxis,
        'series1[0].data':fbs,
        'series2[0].data':diastolics,
        'series2[1].data':systolic,
        'series3[0].data':cardiac,
        'series4[0].data':bmis,
      })
       this.echartsComponnet = this.selectComponent('#mychart1');
       this.init_echarts(1)
       this.echartsComponnet = this.selectComponent('#mychart2');
       this.init_echarts(2)
       this.echartsComponnet = this.selectComponent('#mychart3');
       this.init_echarts(3)
       this.echartsComponnet = this.selectComponent('#mychart4');
       this.init_echarts(4)
    }else{
      wx.showModal({
       content:'暂无记录'
      })
    }
   
    })
  },
  onLoad: function (options) {
    this.search()
    // this.searchmore()
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