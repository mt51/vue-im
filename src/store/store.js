import storage from '@/util/storage'
import { typeOf, objIsEmpty } from '@/util/utils'

const IMStroe = function(IM, initialState = {}) {
  if (!IM) {
    throw new Error('IM is required')
  }
  this.IM = IM
  this.states = {
    currentChatId: null,
    chatLog: [],
    newMsgLists: {},
    currentTab: 'user',
    count: 0,
    skin: 'blue',
    history: {},
    userInfoCenter: {},
    mine: null
  }

  for (let prop in initialState) {
    if (initialState.hasOwnProperty(prop) && this.state.hasOwnProperty(prop)) {
      this.states[prop] = initialState
    }
  }
}

IMStroe.prototype.mutations = {
  setMine(states, mineInfo) {
    states.mine = mineInfo
  },
  setCurrentChat(states, currentChatId) {
    states.currentChatId = currentChatId
  },
  setCurrentTab(states, currentTab) {
    states.currentTab = currentTab
  },
  setSkin(states, skin) {
    const oldSkin = states.skin
    if (oldSkin !== skin) {
      states.skin = skin
      storage.setItem('im-skin', skin)
    }
  },
  initUserInfoCenter(states, userInfoData) {
    if (typeOf(userInfoData) !== 'array' || userInfoData.length === 0) {
      return
    }
    userInfoData.forEach(item => {
      states.userInfoCenter[item.id] = item
    })
  },
  updateUserInfoCenter(states, userInfo) {
    if (typeOf(userInfo) !== 'object' || objIsEmpty(userInfo)) {
      return
    }
    states.userInfoCenter[userInfo.id] = userInfo
  },
  initHistory(states, historyData) {
    if (typeOf(historyData) !== 'object' || objIsEmpty(historyData)) {
      return
    }
    states.history = historyData
  },
  setHistory(states, history) {
    if (typeOf(history) !== 'object' || objIsEmpty(history)) {
      return
    }
    if (!states.history.hasOwnProperty(history.id)) {
      this.IM.$set(states.history, history.id, [])
    }
    states.history[history.id].push(history)
    let localStorageData = JSON.parse(storage.getItem('vue-im'))
    localStorageData.history = states.history
    storage.setItem('vue-im', localStorageData)
  },
  initChatLog(states, chatLogData) {
    if (typeOf(chatLogData) !== 'array') {
      return
    }
    chatLogData.forEach(item => {
      const tempItem = {
        id: item.id,
        lastChat: item.lastChat,
        lastChatTime: item.lastChatTime,
        username: item.username,
        avatar: item.avatar,
        chatlogType: item.chatlogType
      }
      states.chatLog.push(tempItem)
    })
  },
  updateChatLog(states, chatLog) {
    if (typeOf(chatLog) !== 'object' || objIsEmpty(chatLog)) {
      return
    }
    const index = states.chatLog.findIndex(item => item.id === chatLog.id)
    const tempItem = {
      id: chatLog.id,
      lastChat: chatLog.lastChat,
      lastChatTime: chatLog.lastChatTime,
      username: chatLog.username,
      avatar: chatLog.avatar,
      chatlogType: chatLog.chatlogType
    }
    if (index > -1) {
      this.IM.$set(states.chatLog, index, tempItem)
    } else {
      states.chatLog.unshift(tempItem)
      this.IM.$set(states.chatLog, 0, tempItem)
    }
    const localStorageData = JSON.parse(storage.getItem('vue-im'))
    localStorageData.chatLog = states.chatLog
    storage.setItem('vue-im', localStorageData)
  },
  removeChatLog(states, index) {
    states.chatLog.splice(index, 1)
    let localStorageData = JSON.parse(storage.getItem('vue-im'))
    localStorageData.chatLog = states.chatLog
    storage.setItem('vue-im', localStorageData)
  },
  updateNewMsgList(states, data) {
    if (!data) return
    if (typeOf(data) === 'array') {
      data.forEach(c => {
        this.commit('setNewMsgList', c)
      })
    } else if (typeOf(data) === 'object') {
      this.commit('setNewMsgList', data)
    }
  },
  setNewMsgList(states, c) {
    if (states.newMsgLists.hasOwnProperty(c.id)) {
      states.newMsgLists[c.id].push(c)
    } else {
      this.IM.$set(states.newMsgLists, c.id, [c])
    }
    let localStorageData = JSON.parse(storage.getItem('vue-im'))
    localStorageData.newMsgLists = states.newMsgLists
    storage.setItem('vue-im', localStorageData)
  },
  removeNewMsgList(states, id) {
    this.$delele(states.newMsgLists, id)
    let localStorageData = JSON.parse(storage.getItem('vue-im'))
    localStorageData.newMsgLists = states.newMsgLists
    storage.setItem('vue-im', localStorageData)
  }
}

IMStroe.prototype.commit = function(name, ...args) {
  const mutations = this.mutations
  if (mutations[name]) {
    mutations[name].apply(this, [this.states].concat(args))
  } else {
    throw new Error(`Action not found: ${name}`)
  }
}

export default IMStroe
