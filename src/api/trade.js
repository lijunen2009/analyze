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
export function getTradeInfo(params) {
  return request({
    url: 'Analyze/getTradeInfo',
    method: 'post',
    data: params
  })
}
export function machineCount(params) {
  return request({
    url: 'Analyze/machineCount',
    method: 'post',
    data: params
  })
}


