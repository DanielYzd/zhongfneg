const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
const formatDate = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  return [year, month, day].map(formatNumber).join('-')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

var imgs= ['../../images/home1.png','../../images/home2.png','../../images/home3.png']
var tarimgs=[
  {name:'电话咨询',src:"../../images/index1.png"},
  {name:'风险记录',src:"../../images/index2.png"},
  {name:'在线咨询',src:"../../images/index3.png"},
  {name:'紧急联系人',src:"../../images/index4.png"},
]
var telARR1= [
  {name:'张明杰',tel:'18989892345'},
  {name:'张明杰2',tel:'18989892345'},
  {name:'张明杰3',tel:'18989892345'},
  {name:'张明杰4',tel:'18989892345'},
  {name:'张明杰5',tel:'18989832345'},
  {name:'张明杰6',tel:'189845592345'},
]
var telARR2= [
  {name:'张明杰',tel:'18989892345'},
  {name:'张明杰',tel:'18989892345'},
  {name:'张明杰',tel:'18989892345'},
  {name:'张明杰2',tel:'18989892345'},
  {name:'张明杰3',tel:'18989892345'},
  {name:'张明杰4',tel:'18989892345'},
  {name:'张明杰师5',tel:'18989891145'},
  {name:'张明杰医6',tel:'18989894345'},
]
module.exports = {
  formatTime: formatTime,
  formatDate:formatDate,
  homeImages: imgs,
  indexImages:tarimgs,
  telARR1:telARR1,
  telARR2:telARR2
}
