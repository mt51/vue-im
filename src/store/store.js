import storage from '@/util/storage'
import { typeOf, objIsEmpty, deepCopy } from '@/util/utils'

const saveChatList = function (data) {
  let localData = storage.readData('iminfo')
  if (data.length > 30) {
    data = data.slice(0, 29)
  }
  let tempData = []
  data.forEach(item => {
    let tempItem = {
      id: item.id,
      type: item.type
    }
    tempData.push(tempItem)
  })
  localData.chatList = tempData
  storage.saveData('iminfo', localData)
}

const saveHistory = function (history) {
  let tempData = {}
  Object.keys(history).map(key => {
    if (history[key].length > 10) {
      tempData[key] = history[key].slice(history[key].length - 10)
    } else {
      tempData[key] = history[key]
    }
  })
  for (let key in tempData) {
    tempData[key].forEach(item => {
      delete item.avatar
      delete item.username
    })
  }
  let localData = storage.readData('iminfo')
  localData.history = tempData
  storage.saveData('iminfo', localData)
}

const IMStroe = function (IM, initialState = {}) {
  if (!IM) {
    throw new Error('IM is required')
  }
  this.IM = IM
  this.states = {
    currentChat: null,
    chatLogsList: [],
    newMsgLists: {},
    currentTab: 'user',
    count: 0,
    skin: 'blue',
    mine: null,
    localHistory: {},
    userInfoCenter: {}
  }

  for (let prop in initialState) {
    if (initialState.hasOwnProperty(prop) && this.state.hasOwnProperty(prop)) {
      this.states[prop] = initialState
    }
  }
}

IMStroe.prototype.mutations = {
  setCurrentChat (states, currentChat) {
    const oldCurrentChat = states.currentChat
    if (!currentChat) {
      return null
    } else if (oldCurrentChat === null || oldCurrentChat.id !== currentChat.id) {
      states.currentChat = {
        id: currentChat.id,
        hostId: states.mine.id,
        type: currentChat.type
      }
      this.IM.$emit('on-chat-change', currentChat)
      storage.saveData('currentChat', states.currentChat)
    }
    if (oldCurrentChat !== null) {
      states.newMsgLists[oldCurrentChat.id] = []
    }
  },
  setCurrentTab (states, currentTab) {
    states.currentTab = currentTab
    if (currentTab === 'chat' && states.count !== 0) {
      this.commit('clearCount')
    }
  },
  setSkin (states, skin) {
    const oldSkin = states.skin
    if (oldSkin !== skin) {
      states.skin = skin
      storage.setItem('im-skin', skin)
    }
  },
  updateChatLogsList (states, chatLog) {
    if (chatLog === null || chatLog === undefined) chatLog = []
    if (typeOf(chatLog) === 'array') {
      chatLog.map(item => {
        item.count ? item.count : 0
      })
      states.chatLogsList = chatLog
    } else {
      let tempIndex
      states.chatLogsList.forEach((item, index) => {
        if (item.id === chatLog.id) {
          tempIndex = index
        }
      })
      if (tempIndex > -1) {
        states.chatLogsList.splice(tempIndex, 1)
      }
      if (chatLog.id === states.currentChat.id) {
        chatLog.count = 0
      } else {
        chatLog.count = chatLog.count || 0
      }
      states.chatLogsList.unshift(chatLog)
    }
    this.commit('updateChatLog', chatLog)
    saveChatList(states.chatLogsList)
  },
  updateChatLog (states, message) {
    const history = states.localHistory
    if (objIsEmpty(history)) return
    const tempData = deepCopy(states.chatLogsList)
    tempData.map(item => {
      const hisItem = history[item.id]
      if (hisItem !== undefined) {
        const len = hisItem.length - 1
        item.chatlog = hisItem[len].content
        item.chatlogType = hisItem[len].chatlogType || 'text'
        item.time = hisItem[len].time
      }
    })
    states.chatLogsList = tempData
  },
  removeChatLog (states, index) {
    states.chatLogsList.splice(index, 1)
    saveChatList(states.chatLogsList)
    this.commit('setCurrentChat', states.chatLogsList[0])
  },
  getNewMsg (states, message) {
    if (!states.newMsgLists.hasOwnProperty(message.sender)) {
      states.newMsgLists[message.sender] = []
    }
    states.newMsgLists[message.sender].push(message)
    if (states.currentTab !== 'chat') {
      states.count += 1
    }
  },
  setLocalHistory (states, localHistory) {
    states.localHistory = localHistory
  },
  updateLocalHistory (states, sendData) {
    const tempData = deepCopy(states.localHistory)
    if (!tempData.hasOwnProperty(sendData.id)) {
      tempData[sendData.id] = []
    }
    tempData[sendData.id].push(sendData)
    states.localHistory = tempData
    saveHistory(states.localHistory)
    this.commit('updateChatLog', sendData)
  },
  resetItemCount (states, chatLog) {
    const index = states.chatLogsList.findIndex(item => item.id === chatLog.id)
    states.newMsgLists[chatLog.id] = []
    states.chatLogsList.splice(index, 1, chatLog)
  },
  clearCount (states) {
    states.count = 0
  },
  setUserInfoCenter (states, userInfo) {
    const tempData = deepCopy(states.userInfoCenter)
    userInfo.forEach(item => {
      if (!tempData.hasOwnProperty(item.id)) {
        tempData[item.id] = {
          avatar: item.avatar,
          type: item.type,
          username: item.username
        }
      }
    })
    states.userInfoCenter = tempData
  },
  updateUserInfoCenter (states, userInfo) {
    if (!states.userInfoCenter.hasOwnProperty(userInfo)) {
      states.userInfoCenter[userInfo.id] = {
        avatar: userInfo.avatar,
        type: userInfo.type,
        username: userInfo.username
      }
    }
  }
}

IMStroe.prototype.commit = function (name, ...args) {
  const mutations = this.mutations
  if (mutations[name]) {
    mutations[name].apply(this, [this.states].concat(args))
  } else {
    throw new Error(`Action not found: ${name}`)
  }
}

export default IMStroe
