import request from '@/utils/guestrequest'

export function fetchList(data) {
  return request({
    url: '/store/index',
    method: 'post',
    data
  })
}
