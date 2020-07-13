const wxapi = {
  // 对微信api公共函数promise化
  wxapi:(wxApiName,obj)=>{
    return new Promise((resolve,reject)=>{
      wx[wxApiName]({
        ...obj,//扩展运算符 浅拷贝
        success:(res)=>{
          resolve(res)
        },
        fail:(error)=>{
          reject(error)
        }
      })
    })
  },
  /**
   * 以下是微信Api Promise化的特殊案例
   */
  wxsetData: (pageObj, obj) => {
    if(pageObj && obj){
      return new Promise((resolve, reject) => {
        pageObj.setData(obj, resolve(obj));
      });
    }
  },
}

module.exports = wxapi;