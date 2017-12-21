import moment from 'moment'

moment.locale('zh-cn')

export function formatDate (value) {
  if (!value) {
    return value
  }
  const now = Date.now()
  const diff = now - value
  const oneDay = 24 * 60 * 60 * 1000
  if (diff < oneDay) {
    return moment(value).format('HH:mm')
  } else if (diff < 2 * oneDay) {
    return '昨天'
  } else if (diff < 7 * oneDay && diff > 2 * oneDay) {
    return moment(value).format('dddd')
  } else {
    return ''
  }
}
