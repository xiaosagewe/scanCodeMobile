import request from '@/utils/request';

export function saveCode(data) {
  return request({
    url: 'https://www.boyue56.cn/rs/code/save',
    method: 'post',
    data,
  });
}

export function getCodePage(data) {
  return request({
    url: 'https://www.boyue56.cn/rs/code/page',
    method: 'post',
    data,
  });
}

export function getCodeTypes(data) {
  return request({
    url: 'https://www.boyue56.cn/rs/code/getNo',
    method: 'post',
    data,
  });
}

export function sendCodesToEmail(data) {
  return request({
    url: 'https://www.boyue56.cn/rs/code/sendMail',
    method: 'post',
    data,
  });
}