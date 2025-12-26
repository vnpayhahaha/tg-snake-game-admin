import type { ResponseStruct } from '#/global'

export interface TronTransactionLogVo {
  // 主键ID
  id: number
  // 群组ID
  group_id: number
  // 交易哈希
  tx_hash: string
  // 发送地址
  from_address: string
  // 接收地址
  to_address: string
  // 金额
  amount: number
  // 区块高度
  block_height: number
  // 区块时间戳
  block_timestamp: number
  // 交易状态
  status: string
  // 是否有效
  is_valid: boolean
  // 无效原因
  invalid_reason: string
  // 是否已处理
  processed: boolean
  // 创建时间
  created_at: string
}

export interface TronStatisticsVo {
  total_transactions: number
  total_amount: number
  valid_transactions: number
  invalid_transactions: number
  processed_transactions: number
  unprocessed_transactions: number
}

export interface SyncTransactionsResultVo {
  success: boolean
  message: string
  synced_count: number
  valid_count: number
  invalid_count: number
}

// 获取交易日志列表
export function page(params: any): Promise<ResponseStruct<TronTransactionLogVo[]>> {
  return useHttp().get('/admin/tg_game/tron_log/list', { params })
}

// 获取未处理的交易
export function getUnprocessed(): Promise<ResponseStruct<TronTransactionLogVo[]>> {
  return useHttp().get('/admin/tg_game/tron_log/unprocessed')
}

// 根据群组ID查询交易
export function getByGroupId(groupId: number, params?: any): Promise<ResponseStruct<TronTransactionLogVo[]>> {
  return useHttp().get(`/admin/tg_game/tron_log/by_group/${groupId}`, { params })
}

// 根据交易哈希查询
export function getByTxHash(txHash: string): Promise<ResponseStruct<TronTransactionLogVo>> {
  return useHttp().get(`/admin/tg_game/tron_log/by_tx_hash/${txHash}`)
}

// 根据钱包地址查询交易
export function getByAddress(address: string, params?: any): Promise<ResponseStruct<TronTransactionLogVo[]>> {
  return useHttp().get(`/admin/tg_game/tron_log/by_address/${address}`, { params })
}

// 获取交易统计
export function statistics(params?: any): Promise<ResponseStruct<TronStatisticsVo>> {
  return useHttp().get('/admin/tg_game/tron_log/statistics', { params })
}

// 手动重新处理交易
export function reprocess(id: number): Promise<ResponseStruct<{ success: boolean; message: string; node_created: boolean }>> {
  return useHttp().post(`/admin/tg_game/tron_log/${id}/reprocess`)
}

// 手动同步区块链交易
export function syncTransactions(data?: { group_id?: number; start_block?: number; end_block?: number }): Promise<ResponseStruct<SyncTransactionsResultVo>> {
  return useHttp().post('/admin/tg_game/tron_log/sync_transactions', data)
}

// 删除交易日志
export function deleteByIds(ids: number[]): Promise<ResponseStruct<null>> {
  return useHttp().delete('/admin/tg_game/tron_log', { data: ids })
}
