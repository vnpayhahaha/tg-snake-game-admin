import type { ResponseStruct } from '#/global'

export interface GameGroupConfigVo {
  // 主键ID
  id: number
  // 租户ID
  tenant_id: string
  // Telegram群组ID
  tg_chat_id: number
  // Telegram群组标题
  tg_chat_title: string
  // 钱包地址
  wallet_address: string
  // 钱包变更次数（钱包周期）
  wallet_change_count: number
  // 待更新的钱包地址
  pending_wallet_address: string
  // 钱包变更状态：1-正常，2-变更中
  wallet_change_status: number
  // 钱包变更开始时间
  wallet_change_start_at: string
  // 钱包变更生效时间
  wallet_change_end_at: string
  // 热钱包地址
  hot_wallet_address: string
  // 热钱包私钥（加密存储）
  hot_wallet_private_key: string
  // 投注金额
  bet_amount: number
  // 平台手续费比例
  platform_fee_rate: number
  // Telegram管理员白名单（逗号分隔）
  telegram_admin_whitelist: string
  // 状态：1-正常，2-停用
  status: number
  // 创建时间
  created_at: string
  // 更新时间
  updated_at: string
}

export interface WalletChangeResultVo {
  wallet_change_start_at: string
  wallet_change_end_at: string
}

export interface CompleteWalletChangeVo {
  old_wallet: string
  new_wallet: string
  wallet_cycle: number
}

// 获取群组配置列表
export function page(params: any): Promise<ResponseStruct<GameGroupConfigVo[]>> {
  return useHttp().get('/admin/tg_game/config/list', { params })
}

// 获取配置详情
export function detail(id: number): Promise<ResponseStruct<GameGroupConfigVo>> {
  return useHttp().get(`/admin/tg_game/config/${id}`)
}

// 创建群组配置
export function create(data: GameGroupConfigVo): Promise<ResponseStruct<null>> {
  return useHttp().post('/admin/tg_game/config', data)
}

// 更新群组配置
export function save(id: number, data: GameGroupConfigVo): Promise<ResponseStruct<null>> {
  return useHttp().put(`/admin/tg_game/config/${id}`, data)
}

// 开始钱包变更
export function startWalletChange(id: number, data: { new_wallet_address: string; cooldown_minutes: number }): Promise<ResponseStruct<WalletChangeResultVo>> {
  return useHttp().post(`/admin/tg_game/config/${id}/start_wallet_change`, data)
}

// 取消钱包变更
export function cancelWalletChange(id: number): Promise<ResponseStruct<null>> {
  return useHttp().post(`/admin/tg_game/config/${id}/cancel_wallet_change`)
}

// 完成钱包变更
export function completeWalletChange(id: number): Promise<ResponseStruct<CompleteWalletChangeVo>> {
  return useHttp().post(`/admin/tg_game/config/${id}/complete_wallet_change`)
}

// 删除群组配置
export function deleteByIds(ids: number[]): Promise<ResponseStruct<null>> {
  return useHttp().delete('/admin/tg_game/config', { data: ids })
}
