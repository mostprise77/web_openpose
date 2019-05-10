import fetch from 'dva/fetch';

const checkStatus = response => {
  return new Promise(resolve => {
    response.json().then(data => {
      if (response.status >= 200 && response.status < 300) {
        resolve({ data, error: '' });
      }
      if (response.status === 400 || response.status === 401 || response.status === 404) {
        resolve({ data: '', error: data });
      }
    });
  });
};

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */

const request = (type, url, data, urlParams, headers, options) => {
  let fetchOpt = {
    method: type,
    headers: {
      Accept: 'application/x-www-form-urlencoded',
      token: window.localStorage.getItem('token'),
      database:window.localStorage.getItem('database'),
      ...headers,
    },
    ...options,
  };

  if (data instanceof FormData) {
    fetchOpt['body'] = data;
  } else if (data instanceof Object) {
    fetchOpt['body'] = JSON.stringify(data);
    fetchOpt.headers['Content-Type'] = 'application/json';
  }

  if (urlParams instanceof Object) {
    url += url.includes('?') ? '' : '?';
    for (let key in urlParams) {
      let value = urlParams[key];
      if (value || value === false) {
        value = typeof value === 'string' ? value : JSON.stringify(value);
        url += '&' + key + '=' + encodeURIComponent(value);
      }
    }
  }

  return fetch(url, fetchOpt)
    .then(checkStatus)
    .catch(error => {
      return { error };
    });
};

export default {
  get: (url, urlParams, headers, options) => request('GET', url, null, urlParams, headers, options),
  post: (url, data, urlParams, headers, options) =>
    request('POST', url, data, urlParams, headers, options),
  put: (url, data, urlParams, headers, options) =>
    request('PUT', url, data, urlParams, headers, options),
  delete: (url, urlParams, headers, options) =>
    request('DELETE', url, null, urlParams, headers, options),
  patch: (url, data, urlParams, headers, options) =>
    request('PATCH', url, data, urlParams, headers, options),
};
