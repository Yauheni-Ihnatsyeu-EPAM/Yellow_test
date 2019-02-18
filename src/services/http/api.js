import config from '../../config';


const successHttpStatuses = [200, 201];
const _headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};


function handleError(response) {
  if (response.status === 401) {
    // unautorized clean and reset all user info
    // reset nav
  }
}

function _request(url, method, body, headers = {}) {
  url = `${config.serverSideUrl}${url}`;
  headers = { ..._headers, ...headers, Authorization: sessionStorage.getItem('token') };
  console.log('[API] url', url);
  console.log('[API] method', method);
  if (body) {
    console.log('[API] body', body);
  }

  return fetch(url, { method, headers, body })
    .then((response) => {
      console.log('[API] response', response);

      // TODO response.status >= 200 && response.status < 300
      if (successHttpStatuses.indexOf(response.status) === -1) {
        handleError(response);
        return response.json().then((error) => {
          if (error.error_code === undefined) {
            error.error_code = 'unknown_error';
          }
          console.log('[API] error', error);
          throw error.error_code;
        });
      }

      return response.json();
    });
}

//// пришлось дописать в оригинале нету
function _requestGet(url, method, body, headers = {}) {
  url = `${config.serverSideUrl}${url}`;
  headers = { ..._headers, ...headers, Authorization: sessionStorage.getItem('token') };
  console.log('[API] url', url);
  console.log('[API] method', method);
  if (body) {
    console.log('[API] body', body);
  }

  return fetch(url, { method, headers })
    .then((response) => {
      console.log('[API] response', response);

      // TODO response.status >= 200 && response.status < 300
      if (successHttpStatuses.indexOf(response.status) === -1) {
        handleError(response);
        return response.json().then((error) => {
          if (error.error_code === undefined) {
            error.error_code = 'unknown_error';
          }
          console.log('[API] error', error);
          throw error.error_code;
        });
      }

      return response.json();
    });
}

function coverArrToGetParams(arr, name) {
  let string = '';
  Object.keys(arr).forEach((key) => {
    if (string !== '') {
      string += '&';
    }
    string += `${name}[]=${encodeURIComponent(arr[key])}`;
  });
  return string;
}

function createGetParams(object) {
  let string = '';
  if (!object) {
    return string;
  }

  string = '?';
  string += Object.keys(object).map(key => (Array.isArray(object[key]) ? coverArrToGetParams(object[key], key) : `${key}=${object[key]}`)).join('&');

  return string;
}

function _requestWithBody(url, data, headers, method) {
  data = data || {};
  // data.access_token = getState().driver.appState.jwtAccessToken;
  const body = JSON.stringify(data);
  return _request(url, method, body, headers);

  // return storage.get(storage.keys.user).then((user) => {
  //   if (user && user.access_token) {
  //     data = data || {};
  //     data.access_token = user.access_token;
  //   }
  //   const body = JSON.stringify(data);
  //   return _request(url, method, body, headers);
  // });
}


const api = {

  get(url, data, headers) {
    data = data || {};
    url += createGetParams(data);
    return _requestGet(url, 'GET', '', headers);
    // return storage.get(storage.keys.user).then((user) => {
    //   if (user && user.access_token) {
    //     data = data || {};
    //     data.access_token = user.access_token;
    //   }
    //   url = url + createGetParams(data);
    //   return _request(url, 'GET', '', headers);
    // })
  },
  post(url, data, headers) {
    return _requestWithBody(url, data, headers, 'POST');
  },
  put(url, data, headers) {
    return _requestWithBody(url, data, headers, 'PUT');
  },
  delete(url, data, headers) {
    return _requestWithBody(url, data, headers, 'DELETE');
  },
};


export default api;
