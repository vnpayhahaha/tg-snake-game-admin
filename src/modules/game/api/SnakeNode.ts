import type { ResponseStruct } from '#/global'

export interface SnakeNodeVo {
  // 主键ID
  id: number
  // 群组ID
  group_id: number
  // 钱包周期
  wallet_cycle: number
  // 购彩凭证(00-99)
  ticket_number: string
  // 凭证流水号
  ticket_serial_no: string
  // 玩家钱包地址
  player_address: string
  // 玩家Telegram用户名
  player_tg_username: string
  // 玩家Telegram用户ID
  player_tg_user_id: number
  // 投注金额
  amount: number
  // 交易哈希
  tx_hash: string
  // 区块高度
  block_height: number
  // 当天第几笔交易
  daily_sequence: number
  // 状态：1-活跃，2-已中奖，3-未中奖
  status: number
  // 匹配的中奖记录ID
  matched_prize_id: number
  // 创建时间
  created_at: string
}

export interface DailyStatisticsVo {
  total_nodes: number
  total_amount: number
  unique_players: number
  active_nodes: number
  matched_nodes: number
}

// 获取蛇身节点列表
export function page(params: any): Promise<ResponseStruct<SnakeNodeVo[]>> {
  return useHttp().get('/admin/tg_game/snake_node/list', { params })
}

// 获取群组活跃节点
export function getActiveNodes(groupId: number): Promise<ResponseStruct<SnakeNodeVo[]>> {
  return useHttp().get(`/admin/tg_game/snake_node/active/${groupId}`)
}

// 根据钱包周期查询节点
export function getByWalletCycle(groupId: number, walletCycle: number): Promise<ResponseStruct<SnakeNodeVo[]>> {
  return useHttp().get(`/admin/tg_game/snake_node/by_wallet_cycle/${groupId}/${walletCycle}`)
}

// 根据玩家查询购彩记录
export function getByPlayer(groupId: number, walletAddress: string, params?: any): Promise<ResponseStruct<SnakeNodeVo[]>> {
  return useHttp().get(`/admin/tg_game/snake_node/by_player/${groupId}/${walletAddress}`, { params })
}

// 根据交易哈希查询节点
export function getByTxHash(txHash: string): Promise<ResponseStruct<SnakeNodeVo>> {
  return useHttp().get(`/admin/tg_game/snake_node/by_tx_hash/${txHash}`)
}

// 获取当日节点统计
export function getDailyStatistics(groupId: number, params?: any): Promise<ResponseStruct<DailyStatisticsVo>> {
  return useHttp().get(`/admin/tg_game/snake_node/daily_statistics/${groupId}`, { params })
}

// 手动归档节点
export function archive(id: number): Promise<ResponseStruct<null>> {
  return useHttp().post(`/admin/tg_game/snake_node/${id}/archive`)
}

// 更新节点状态
export function updateStatus(id: number, data: { status: number }): Promise<ResponseStruct<null>> {
  return useHttp().put(`/admin/tg_game/snake_node/${id}/status`, data)
}

// 删除节点
export function deleteByIds(ids: number[]): Promise<ResponseStruct<null>> {
  return useHttp().delete('/admin/tg_game/snake_node', { data: ids })
}
