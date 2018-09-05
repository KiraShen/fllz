  const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

let getCert = (id, cb) => {
  console.log("getting cert...")
  let getTable = getApp().globalData.orderTable,
    getObject = new wx.BaaS.TableObject(getTable),
    query = new wx.BaaS.Query()

  query.compare('certID', '=', id)
  getObject.setQuery(query).find()
    .then(res => cb(res))
    .catch(err => console.dir(err))
}

let getOrder = (id, cb) => {
  console.log("getting order...")
  let getTable = getApp().globalData.orderTable,
    getObject = new wx.BaaS.TableObject(getTable),
    query = new wx.BaaS.Query()

  query.compare('uID', '=', id)
  getObject.setQuery(query).find()
    .then(res => cb(res))
    .catch(err => console.dir(err))
}

let getUser = (id, cb) => {
  console.log("getting user...")
  let getTable = getApp().globalData.userTable,
    getObject = new wx.BaaS.TableObject(getTable),
    query = new wx.BaaS.Query()

  query.compare('ID', '=', id)
  getObject.setQuery(query).find()
    .then(res => cb(res))
    .catch(err => console.dir(err))
}

let getAgent = (id, cb) => {
  console.log("getting agent...")
  let getTable = getApp().globalData.agentTable,
    getObject = new wx.BaaS.TableObject(getTable),
    query = new wx.BaaS.Query()

  query.compare('ID', '=', id)
  getObject.setQuery(query).find()
    .then(res => cb(res))
    .catch(err => console.dir(err))
}

let getAllAgent = (desc , cb) => {
  console.log("getting all agent...")
  let getTable = getApp().globalData.agentTable,
    getObject = new wx.BaaS.TableObject(getTable),
    query = new wx.BaaS.Query()

  query.in('ID', desc )
  getObject.setQuery(query).find()
    .then(res => cb(res))
    .catch(err => console.dir(err))
}

let getType = (id, cb) => {
  console.log("getting type...")
  let getTable = getApp().globalData.typeTable,
    getObject = new wx.BaaS.TableObject(getTable),
    query = new wx.BaaS.Query()

  query.compare('ID', '=', id)
  getObject.setQuery(query).find()
    .then(res => cb(res))
    .catch(err => console.dir(err))
}

let getAllType = (desc, cb) => {
  console.log("getting all type...")
  let getTable = getApp().globalData.typeTable,
    getObject = new wx.BaaS.TableObject(getTable),
    query = new wx.BaaS.Query()

  query.in('ID', desc )
  getObject.setQuery(query).find()
    .then(res => cb(res))
    .catch(err => console.dir(err))
}


let getIDCard = (id, cb) => {
  console.log("getting idCard...")
  let getTable = getApp().globalData.userTable,
    getObject = new wx.BaaS.TableObject(getTable),
    query = new wx.BaaS.Query()

  query.compare('idcard', '=', id)
  getObject.setQuery(query).find()
    .then(res => cb(res))
    .catch(err => console.dir(err))
}

let updateMyUser = (id,cb) =>{
  console.log("update wx user uid...")
  let MyUser = new wx.BaaS.User()
  let currentUser = MyUser.getCurrentUserWithoutData()
  currentUser.set('uid', id).update()
    .then(res => cb(res))
    .catch(err => console.dir(err))
}

let openAlert = (str) => {
  console.log('openAlert...')
  wx.showModal({
      content: str,
      showCancel: false,
      success: function (res) {
          if (res.confirm) {
            console.log('openAlert ok.')
          }
      }
  });
}

module.exports = {
  formatTime: formatTime,
  openAlert:openAlert,
  getCert:getCert,
  getOrder:getOrder,
  getUser:getUser,
  getType:getType,
  getAgent:getAgent,
  getIDCard:getIDCard,
  getAllAgent,
  getAllType
}
