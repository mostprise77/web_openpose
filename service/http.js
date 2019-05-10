import request from './request';
const sitemap = 'https://mostprise.com/wxapp_admin/';
function checklogin() {
  return true;
}
function getUrl(url) {
  var reg = /(https?|ftp|file)/g;
  if (!reg.test(url)) {
    return sitemap + url;
  } else {
    return url;
  }
}
export const HTTP = {
  post: (url, data) => {
    if (checklogin()) {
      return request.post(getUrl(url), data);
    }
  },
  get: (url, data) => {
    if (checklogin()) {
      return request.get(getUrl(url), data);
    }
  },
  patch: (url, data) => {
    if (checklogin()) {
      return request.patch(getUrl(url), null, data);
    }
  },
};
