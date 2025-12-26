import type { ResponseStruct } from '#/global'

export interface PlayerWalletBindingVo {
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
  // 钱包地址
  wallet_address: string
  // 绑定时间
  bind_at: string
  // 创建时间
  created_at: string
  // 更新时间
  updated_at: string
}

export interface BatchImportResultVo {
  total: number
  success: number
  failed: number
  errors: any[]
}

// 获取玩家钱包绑定列表
export function page(params: any): Promise<ResponseStruct<PlayerWalletBindingVo[]>> {
  return useHttp().get('/admin/tg_game/wallet_binding/list', { params })
}

// 根据Telegram用户ID查询绑定
export function getByTgUser(groupId: number, tgUserId: number): Promise<ResponseStruct<PlayerWalletBindingVo>> {
  return useHttp().get(`/admin/tg_game/wallet_binding/by_tg_user/${groupId}/${tgUserId}`)
}

// 创建钱包绑定
export function create(data: PlayerWalletBindingVo): Promise<ResponseStruct<{ binding_id: number; success: boolean }>> {
  return useHttp().post('/admin/tg_game/wallet_binding', data)
}

// 批量导入绑定关系
export function batchImport(data: { group_id: number; bindings: any[] }): Promise<ResponseStruct<BatchImportResultVo>> {
  return useHttp().post('/admin/tg_game/wallet_binding/batch_import', data)
}

// 解除绑定
export function unbind(id: number): Promise<ResponseStruct<null>> {
  return useHttp().post(`/admin/tg_game/wallet_binding/${id}/unbind`)
}

// 删除绑定
export function deleteByIds(ids: number[]): Promise<ResponseStruct<null>> {
  return useHttp().delete('/admin/tg_game/wallet_binding', { data: ids })
}
