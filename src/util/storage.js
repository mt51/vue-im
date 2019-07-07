const getItem = function(name) {
  return window.localStorage.getItem(name)
}

const setItem = function(name, data) {
  if (typeof data === 'object') {
    return window.localStorage.setItem(name, JSON.stringify(data))
  } else {
    return window.localStorage.setItem(name, data)
  }
}

const removeItem = function(name) {
  window.localStorage.removeItem(name)
}

const clear = function() {
  window.localStorageclear()
}

export default {
  getItem,
  setItem,
  removeItem,
  clear
}
