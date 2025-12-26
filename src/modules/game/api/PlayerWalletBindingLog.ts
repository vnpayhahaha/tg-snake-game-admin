import type { ResponseStruct } from '#/global'

export interface PlayerWalletBindingLogVo {
  // 主键ID
  id: number
  // 群组ID
  group_id: number
  // Telegram用户ID
  tg_user_id: number
  // Telegram用户名
  tg_username: string
  // 操作类型：bind/unbind/update
  action: string
  // 旧钱包地址
  old_wallet_address: string
  // 新钱包地址
  new_wallet_address: string
  // 来源：1-管理后台，2-Telegram Bot，3-系统
  source: number
  // 创建时间
  created_at: string
}

// 获取钱包绑定日志列表
export function page(params: any): Promise<ResponseStruct<PlayerWalletBindingLogVo[]>> {
  return useHttp().get('/admin/tg_game/wallet_binding_log/list', { params })
}

// 根据用户查询绑定历史
export function getByUser(groupId: number, tgUserId: number, params?: any): Promise<ResponseStruct<PlayerWalletBindingLogVo[]>> {
  return useHttp().get(`/admin/tg_game/wallet_binding_log/by_user/${groupId}/${tgUserId}`, { params })
}
