import util from '../lib/util.js';
function initData(params) {
  var URLSearchParams = require('url-search-params');
  // 360浏览器不支持URLSearchParams
  if (typeof URLSearchParams === "function") {
    var formMap = new URLSearchParams();
    for (var key in params) {
      formMap.append(key, params[key]);
    }
    return formMap;
  }
  else {
    return params;
  }
}

export default async (url = '', baseUrl = '', data = {}, dataType = 'JSON', type = 'GET', method = 'fetch') => {
  type = type.toUpperCase();
  // 清除空参数
  data = util.filter_param(data);
  if (process.env.NODE_ENV === 'development') {
    baseUrl = '/education';
  }
  url = baseUrl + url;
  if (type === 'GET') {
    let dataStr = ''; //数据拼接字符串
    Object.keys(data).forEach(key => {
      dataStr += key + '=' + data[key] + '&';
    })

    if (dataStr !== '') {
      dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
      url = url + '?' + dataStr+'&_t=' + new Date().getTime();
    }
  }

  if (window.fetch && method === 'fetch') {
    var header_content = {
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded'
    };

    if (dataType && dataType === "XML") {
      header_content = {
        'Accept': 'application/xml',
        'Content-Type': 'application/x-www-form-urlencoded'
      };
    }
    let requestConfig = {
      credentials: 'include',
      method: type,
      headers: header_content,
      mode: "cors",
      cache: "force-cache"
    };
    if (type === 'POST') {
      Object.defineProperty(requestConfig, 'body', {
        value: initData(data)
      })
    }
    try {
      const response = await fetch(url, requestConfig);
      if (dataType && dataType === "XML") {
        const responseJson = await response.text();
        responseJson.interfacePath = process.env.NODE_ENV === 'development' ? url : '';
        return responseJson
      }
      else {
        const responseJson = await response.json();
        responseJson.interfacePath = process.env.NODE_ENV === 'development' ? url : '';
        return responseJson
      }
    } catch (error) {
      throw new Error(error)
    }
  } else {
    return new Promise((resolve, reject) => {
      let requestObj;
      if (window.XMLHttpRequest) {
        requestObj = new XMLHttpRequest();
      } else {
        requestObj = new ActiveXObject;
      }

      let sendData = '';
      if (type === 'POST') {
        sendData = JSON.stringify(data);
      }

      requestObj.open(type, url, true);
      requestObj.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      requestObj.setRequestHeader("token", localStorage.token || "");
      requestObj.send(sendData);
      requestObj.onreadystatechange = () => {
        if (requestObj.readyState == 4) {
          if (requestObj.status == 200) {
            let obj = requestObj.response
            if (typeof obj !== 'object' && obj.indexOf("<?xml") == -1) {
              obj = JSON.parse(obj);
            }
            obj.interfacePath = process.env.NODE_ENV === 'development' ? url : '';
            resolve(obj)
          } else {
            reject(requestObj)
          }
        }
      }
    })
  }
}
