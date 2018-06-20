import request from '@/utils/request'

export function tradeNumber(params) {
  return request({
    url: 'Analyze/tradeNumber',
    method: 'post',
    data: params
  })
}
