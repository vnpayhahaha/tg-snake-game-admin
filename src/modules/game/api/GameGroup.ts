import type { ResponseStruct } from '#/global'

export interface GameGroupVo {
  // 主键ID
  id: number
  // 配置ID
  config_id: number
  // 群组名称（前端扩展字段，用于创建/编辑）
  group_name?: string
  // 状态（前端扩展字段，用于创建/编辑）1-正常 2-停用
  status?: number
  // Telegram群组ID
  tg_chat_id: number
  // 奖池金额
  prize_pool_amount: number
  // 当前蛇身节点IDs（逗号分隔）
  current_snake_nodes: string
  // 上次蛇身节点IDs
  last_snake_nodes: string
  // 上次中奖节点IDs
  last_prize_nodes: string
  // 上次中奖金额
  last_prize_amount: number
  // 上次中奖地址（逗号分隔）
  last_prize_address: string
  // 上次中奖流水号
  last_prize_serial_no: string
  // 上次中奖时间
  last_prize_at: string
  // 版本号（乐观锁）
  version: number
  // 创建时间
  created_at: string
  // 更新时间
  updated_at: string
}

export interface GroupStatisticsVo {
  total_nodes: number
  total_bet_amount: number
  total_prizes: number
  total_prize_amount: number
  current_pool_amount: number
  active_players: number
}

export interface CurrentSnakeVo {
  group_id: number
  current_nodes: number[]
  current_length: number
  last_nodes: number[]
  last_length: number
  prize_pool_amount: number
}

// 获取游戏群组列表
export function page(params: any): Promise<ResponseStruct<GameGroupVo[]>> {
  return useHttp().get('/admin/tg_game/group/list', { params })
}

// 获取群组详情
export function detail(id: number): Promise<ResponseStruct<GameGroupVo>> {
  return useHttp().get(`/admin/tg_game/group/${id}`)
}

// 获取群组统计数据
export function statistics(id: number, params: any): Promise<ResponseStruct<GroupStatisticsVo>> {
  return useHttp().get(`/admin/tg_game/group/${id}/statistics`, { params })
}

// 获取群组当前蛇身
export function getCurrentSnake(id: number): Promise<ResponseStruct<CurrentSnakeVo>> {
  return useHttp().get(`/admin/tg_game/group/${id}/snake`)
}

// 创建游戏群组
export function create(data: GameGroupVo): Promise<ResponseStruct<null>> {
  return useHttp().post('/admin/tg_game/group', data)
}

// 更新游戏群组
export function save(id: number, data: GameGroupVo): Promise<ResponseStruct<null>> {
  return useHttp().put(`/admin/tg_game/group/${id}`, data)
}

// 重置群组奖池
export function resetPrizePool(id: number): Promise<ResponseStruct<null>> {
  return useHttp().post(`/admin/tg_game/group/${id}/reset_prize_pool`)
}

// 删除游戏群组
export function deleteByIds(ids: number[]): Promise<ResponseStruct<null>> {
  return useHttp().delete('/admin/tg_game/group', { data: ids })
}
