import type { ResponseStruct } from '#/global'

export interface GameGroupConfigLogVo {
  // 主键ID
  id: number
  // 配置ID
  config_id: number
  // 操作类型
  action: string
  // 来源：1-管理后台，2-Telegram Bot，3-系统
  source: number
  // 旧数据（JSON）
  old_data: string
  // 新数据（JSON）
  new_data: string
  // 操作者ID
  operator_id: number
  // 创建时间
  created_at: string
}

// 获取配置变更日志列表
export function page(params: any): Promise<ResponseStruct<GameGroupConfigLogVo[]>> {
  return useHttp().get('/admin/tg_game/config_log/list', { params })
}

// 根据配置ID查询变更历史
export function getByConfigId(configId: number, params?: any): Promise<ResponseStruct<GameGroupConfigLogVo[]>> {
  return useHttp().get(`/admin/tg_game/config_log/by_config/${configId}`, { params })
}

// 获取钱包变更历史
export function getWalletChanges(configId: number): Promise<ResponseStruct<GameGroupConfigLogVo[]>> {
  return useHttp().get(`/admin/tg_game/config_log/wallet_changes/${configId}`)
}
