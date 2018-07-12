import request from '@/utils/request'

export function countCashMoney(params) {
  return request({
    url: 'Analyze/countCashMoney',
    method: 'post',
    data: params
  })
}
export function countReturnCashMoney(params) {
  return request({
    url: 'Analyze/countReturnCashMoney',
    method: 'post',
    data: params
  })
}
