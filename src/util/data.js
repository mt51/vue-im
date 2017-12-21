const saveData = function (key, data) {
  let localData = window.localStorage.getItem('rsIM')
  if (!localData) {
    localData = {
      [key]: data
    }
  } else {
    localData = JSON.parse(localData)
    localData[key] = data
  }
  window.localStorage.setItem('rsIM', JSON.stringify(localData))
}

const readData = function (key) {
  const localData = window.localStorage.getItem('rsIM')
  return localData ? JSON.parse(localData)[key] : localData
}

export default {
  saveData,
  readData
}
