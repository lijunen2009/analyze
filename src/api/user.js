import request from '@/utils/request'

export function fetchList(data) {
  return request({
    url: '/user/index',
    method: 'post',
    data
  })
}
