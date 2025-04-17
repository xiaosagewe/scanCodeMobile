import request from '@/utils/request';

// 查询文件记录列表
export function list(query) {
  return request({
    url: '/demo/docfile/pageList',
    method: 'get',
    params: query,
  });
}

// 删除文件记录
export function deleteDoc(ids) {
  return request({
    url: '/demo/docfile/delete/' + ids,
    method: 'delete',
  });
}

export function uploadDocFileForOrder(data) {
  return request({
    url: `/demo/docfile/uploadDocFileForOrder?code=${data.code}&orderType=${data.orderType}&fileSource=${data.fileSource}`,
    method: 'post',
    data: data.fileList,
  });
}

export function checkOrder(data) {
  return request({
    url: `/demo/docfile/checkOrder?code=${data.code}&orderType=${data.orderType}&fileSource=${data.fileSource}`,
    method: 'post',
    data: data,
  });
}
