// let host = "http://sky.zjdeltamind.com:8000/"
let host = "https://www.zjdeltamind.com/"
// loading配置，请求次数统计
function startLoading() {
  wx.showLoading({
    title: 'Loading...',
    icon: 'none'
  })
}

function endLoading() {
  wx.hideLoading();
}
// 声明一个对象用于存储请求个数
var needLoadingRequestCount = 0;

function showFullScreenLoading() {
  if (needLoadingRequestCount === 0) {
    startLoading();
  }
  needLoadingRequestCount++;
};

function tryHideFullScreenLoading() {
  if (needLoadingRequestCount <= 0) return;
  needLoadingRequestCount--;
  if (needLoadingRequestCount === 0) {
    endLoading();
  }
};

function getData(url, method, data = {}, header = {}, islogin = false) {
  showFullScreenLoading()
  return new Promise((resolve, reject) => {
    if (method === 'POST') {
      header = {
        'Content-type': 'application/json'
      }
    } else {
      header = {
        'Content-type': 'application/x-www-form-urlencoded'
      }
    }
    if (islogin) {
      wx.request({
        url: host + url,
        method: method,
        data: data,
        header: header,
        success(res) {
          console.log(res)
          resolve(res)
        },
        fail(err) {
          reject(err);
          wx.showModal({
            title: '错误',
            content: '网络连接失败'
          })
        },
        complete: function () {
          tryHideFullScreenLoading()
        }
      })
    } else {
      wx.getStorage({
        key: 'loginInfo',
      }).then(res => {
        console.log(res)
        let wechatno = {
          wechatno: res.data.openid
        }
        data = Object.assign(data, wechatno)
        wx.request({
          url: host + url,
          method: method,
          data: data,
          header: header,
          success(res) {
            console.log(res)
            resolve(res)
          },
          fail(err) {
            reject(err);
            wx.showModal({
              title: '错误',
              content: '网络连接失败'
            })
          },
          complete: function () {
            tryHideFullScreenLoading()
          }
        })
      }).catch(error => {

        tryHideFullScreenLoading()
        console.log(error)
        wx.showModal({
          content: '获取用户信息失败',
          title: '操作异常',
          confirmText: "返回首页",
          success: function (res) {
            if (res.confirm) {
              //点击确定按钮
              console.log('返回首页')
              wx.reLaunch({
                url: '/pages/index/index',
              })
            } else if (res.cancel) {
              //点击取消按钮
            }
          }
        })
      })
    }

  })
}
module.exports = {
  getData: getData
}