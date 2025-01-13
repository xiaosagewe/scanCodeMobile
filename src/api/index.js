import request from '@/utils/request';

//登录
export function login(data) {
  return request({
    url: 'https://rs.wxdlzs.com/demo/code/save',
    method: 'post',
    data
  });
}

export function clQrCode(data) {
  return request({
    url: 'https://qrdetector-api.cli.im/v1/detect_binary',
    method: 'post',
    data: {
      remove_background: 1,
      image_path: 'http://rs-cn-20220728.oss-cn-shanghai.aliyuncs.com/image/20240922/1727020668222243.jpg?Expires=2042380668&OSSAccessKeyId=LTAI5t5g39V9oiXfrxJjciWy&Signature=gETb2gc6Yfy8%2FlyEBaR7KnSql4g%3D'
    },
  });
}

export function uploadImg(file) {
  const formData = new FormData();
  formData.append('file', file);
  
  return request({
    url: 'https://rs.wxdlzs.com/demo/code/upload',
    method: 'post',
    data: formData,
  });
}

export function sendToMail(data) {
  return request({
    url: 'https://rs.wxdlzs.com/demo/code/sendMail',
    method: 'post',
    data,
  });
}

export function savePassword(data) {
  return request({
    url: 'https://rs.wxdlzs.com/demo/password/update',
    method: 'post',
    data,
  });
}

export function getDetailByCode(data) {
  return request({
    url: 'https://rs.wxdlzs.com/demo/demo/getCode',
    method: 'post',
    data,
  });
}

export function getWechatConfig(data) {
  return request({
    url: 'https://rs.wxdlzs.com/demo/wechat/sdkSign',
    method: 'post',
    data,
  });
}