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
  // Telegram名字
  tg_first_name: string
  // Telegram姓氏
  tg_last_name: string
  // 变更前钱包地址(首次绑定为空字符串)
  old_wallet_address: string
  // 变更后钱包地址
  new_wallet_address: string
  // 变更类型:1=首次绑定,2=更新绑定
  change_type: number
  // 变更时间
  created_at?: string
}

// 获取钱包绑定日志列表
export function page(params: any): Promise<ResponseStruct<PlayerWalletBindingLogVo[]>> {
  return useHttp().get('/admin/tg_game/wallet_binding_log/list', { params })
}

// 根据用户查询绑定历史
export function getByUser(groupId: number, tgUserId: number, params?: any): Promise<ResponseStruct<PlayerWalletBindingLogVo[]>> {
  return useHttp().get(`/admin/tg_game/wallet_binding_log/by_user/${groupId}/${tgUserId}`, { params })
}
