const axios = require('axios')

let ajax = function ajax(url, body = {}, method = 'GET') {
  let promise
  if (method === 'GET') {
    promise = axios.get(url, {
      params: body,
    })
  } else promise = axios.post(url, body)
  return new Promise((resolve, reject) => {
    promise
      .then((data) => resolve(data))
      .catch((err) => {
        message.warn('err:' + err)
      })
  })
}

exports.ajax = ajax
