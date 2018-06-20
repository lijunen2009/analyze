import request from '@/utils/request'

export function fetchList(data) {
  return request({
    url: '/store/index',
    method: 'post',
    data
  })
}
