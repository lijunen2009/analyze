import request from '@/utils/request'

export function tradeAmount(params) {
  return request({
    url: 'Analyze/tradeAmount',
    method: 'post',
    data: params
  })
}

export function listUnTradeMachine(params) {
  return request({
    url: 'Analyze/listUnTradeMachine',
    method: 'post',
    data: params
  })
}
