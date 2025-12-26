import type { ResponseStruct } from '#/global'

export interface GameGroupConfigLogVo {
  // 主键ID
  id: number
  // 配置表ID
  config_id: number
  // Telegram群组ID
  tg_chat_id: number
  // 变更参数(JSON格式,记录本次提交的字段)
  change_params?: string
  // 变更前的完整配置(JSON格式)
  old_config?: string
  // 变更后的完整配置(JSON格式)
  new_config?: string
  // 操作人
  operator: string
  // 操作IP
  operator_ip: string
  // 变更来源:1=后台编辑,2=TG群指令
  change_source: number
  // Telegram消息ID(仅TG指令时有值)
  tg_message_id?: number
  // 变更时间
  created_at?: string
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
