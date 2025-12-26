import type { ResponseStruct } from '#/global'

export interface PrizeRecordVo {
  // 主键ID
  id: number
  // 群组ID
  group_id: number
  // 开奖流水号
  prize_serial_no: string
  // 钱包周期
  wallet_cycle: number
  // 中奖凭证
  ticket_number: string
  // 首个中奖节点ID
  winner_node_id_first: number
  // 最后中奖节点ID
  winner_node_id_last: number
  // 所有中奖节点IDs（逗号分隔）
  winner_node_ids: string
  // 区间总金额
  total_amount: number
  // 平台手续费
  platform_fee: number
  // 手续费比例
  fee_rate: number
  // 奖池金额
  prize_pool: number
  // 奖金金额
  prize_amount: number
  // 每人奖金
  prize_per_winner: number
  // 奖池剩余
  pool_remaining: number
  // 中奖人数
  winner_count: number
  // 状态：1-待处理，2-转账中，3-已完成，4-失败，5-部分失败
  status: number
  // 版本号
  version: number
  // 创建时间
  created_at: string
  // 更新时间
  updated_at: string
}

export interface PrizeStatisticsVo {
  total_prizes: number
  total_prize_amount: number
  total_winners: number
  total_platform_fee: number
  jackpot_count: number
  range_match_count: number
}

export interface ReprocessResultVo {
  success: boolean
  message: string
  queued_count: number
}

// 获取中奖记录列表
export function page(params: any): Promise<ResponseStruct<PrizeRecordVo[]>> {
  return useHttp().get('/admin/tg_game/prize/list', { params })
}

// 获取中奖记录详情
export function detail(id: number): Promise<ResponseStruct<PrizeRecordVo>> {
  return useHttp().get(`/admin/tg_game/prize/${id}`)
}

// 根据流水号查询中奖记录
export function getBySerialNo(serialNo: string): Promise<ResponseStruct<PrizeRecordVo>> {
  return useHttp().get(`/admin/tg_game/prize/by_serial/${serialNo}`)
}

// 获取群组中奖记录
export function getByGroupId(groupId: number, params?: any): Promise<ResponseStruct<PrizeRecordVo[]>> {
  return useHttp().get(`/admin/tg_game/prize/by_group/${groupId}`, { params })
}

// 获取中奖统计
export function statistics(groupId: number, params?: any): Promise<ResponseStruct<PrizeStatisticsVo>> {
  return useHttp().get(`/admin/tg_game/prize/statistics/${groupId}`, { params })
}

// 获取中奖记录的转账详情
export function getTransfers(id: number): Promise<ResponseStruct<any[]>> {
  return useHttp().get(`/admin/tg_game/prize/${id}/transfers`)
}

// 手动重新处理中奖派发
export function reprocess(id: number): Promise<ResponseStruct<ReprocessResultVo>> {
  return useHttp().post(`/admin/tg_game/prize/${id}/reprocess`)
}

// 更新中奖记录状态
export function updateStatus(id: number, data: { status: number }): Promise<ResponseStruct<null>> {
  return useHttp().put(`/admin/tg_game/prize/${id}/status`, data)
}

// 删除中奖记录
export function deleteByIds(ids: number[]): Promise<ResponseStruct<null>> {
  return useHttp().delete('/admin/tg_game/prize', { data: ids })
}
