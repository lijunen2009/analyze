import request from '@/utils/guestrequest'

export function tradeAmount(params) {
  return request({
   // url: 'Analyze/tradeAmount',
    url: 'api/userlist',
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
    //url: 'Analyze/getTradeInfo',
	url: 'api/poslist',
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
export function listTradeTop5() {
  return request({
    url: 'Analyze/listTradeTop5',
    method: 'post',
  })
}
export function listActiveTop5() {
  return request({
    url: 'Analyze/listActiveTop5',
    method: 'post',
  })
}
export function countByMonth() {
  return request({
    url: 'Analyze/countByMonth',
    method: 'post',
  })
}


