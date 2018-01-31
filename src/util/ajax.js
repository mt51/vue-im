export default function ajax (options) {
  if (!XMLHttpRequest) return
  const xhr = new XMLHttpRequest()
  const formData = new FormData()

  formData.append(options.filename, options.file)

  xhr.open(options.type, options.url)

  xhr.send(formData)

  xhr.onreadystatechange = function (e) {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        const data = JSON.parse(xhr.responseText)
        options.onSuccess(data)
      } else {
        options.onError(xhr)
      }
    }
  }
}
