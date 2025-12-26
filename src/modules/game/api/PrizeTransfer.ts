import type { ResponseStruct } from '#/global'

export interface PrizeTransferVo {
  // 主键ID
  id: number
  // 中奖记录ID
  prize_record_id: number
  // 开奖流水号
  prize_serial_no: string
  // 节点ID
  node_id: number
  // 收款地址
  to_address: string
  // 转账金额
  amount: number
  // 转账交易哈希
  tx_hash: string
  // 状态：1-待处理，2-处理中，3-成功，4-失败
  status: number
  // 重试次数
  retry_count: number
  // 错误信息
  error_message: string
  // 创建时间
  created_at: string
  // 更新时间
  updated_at: string
}

export interface BatchRetryResultVo {
  total: number
  success: number
  failed: number
  errors: any[]
}

// 获取中奖转账列表
export function page(params: any): Promise<ResponseStruct<PrizeTransferVo[]>> {
  return useHttp().get('/admin/tg_game/prize_transfer/list', { params })
}

// 获取待处理的转账
export function getPending(): Promise<ResponseStruct<PrizeTransferVo[]>> {
  return useHttp().get('/admin/tg_game/prize_transfer/pending')
}

// 获取失败的转账
export function getFailed(): Promise<ResponseStruct<PrizeTransferVo[]>> {
  return useHttp().get('/admin/tg_game/prize_transfer/failed')
}

// 根据中奖记录查询转账
export function getByPrizeId(prizeId: number): Promise<ResponseStruct<PrizeTransferVo[]>> {
  return useHttp().get(`/admin/tg_game/prize_transfer/by_prize/${prizeId}`)
}

// 根据交易哈希查询转账
export function getByTxHash(txHash: string): Promise<ResponseStruct<PrizeTransferVo>> {
  return useHttp().get(`/admin/tg_game/prize_transfer/by_tx_hash/${txHash}`)
}

// 手动重试转账
export function retry(id: number): Promise<ResponseStruct<{ success: boolean; message: string }>> {
  return useHttp().post(`/admin/tg_game/prize_transfer/${id}/retry`)
}

// 批量重试失败转账
export function batchRetry(data: { transfer_ids: number[] }): Promise<ResponseStruct<BatchRetryResultVo>> {
  return useHttp().post('/admin/tg_game/prize_transfer/batch_retry', data)
}

// 手动标记转账为成功
export function markSuccess(id: number, data?: { tx_hash?: string }): Promise<ResponseStruct<null>> {
  return useHttp().post(`/admin/tg_game/prize_transfer/${id}/mark_success`, data)
}

// 更新转账状态
export function updateStatus(id: number, data: { status: number }): Promise<ResponseStruct<null>> {
  return useHttp().put(`/admin/tg_game/prize_transfer/${id}/status`, data)
}

// 删除转账记录
export function deleteByIds(ids: number[]): Promise<ResponseStruct<null>> {
  return useHttp().delete('/admin/tg_game/prize_transfer', { data: ids })
}
