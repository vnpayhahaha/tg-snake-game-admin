import type { ResponseStruct } from '#/global'

export interface TelegramCommandMessageVo {
  // 主键ID
  id: number
  // 群组ID
  group_id: number
  // 群组名称
  group_name?: string
  // Telegram群组ID
  tg_chat_id: number
  // Telegram用户ID
  tg_user_id: number
  // Telegram用户名
  tg_username: string
  // 命令类型
  command: string
  // 消息文本
  message_text: string
  // 响应文本
  response_text?: string
  // 是否成功:0=否,1=是
  is_success: number
  // 错误信息
  error_message?: string
  // 创建时间
  created_at?: string
  // 更新时间
  updated_at?: string
}

export interface CommandStatisticsVo {
  // 总消息数
  total_messages: number
  // 成功消息数
  success_messages: number
  // 失败消息数
  failed_messages: number
  // 命令分解统计
  commands_breakdown: Record<string, number>
}

export interface DailyStatisticsVo {
  // 日期
  date: string
  // 总消息数
  total_messages: number
  // 成功消息数
  success_messages: number
  // 失败消息数
  failed_messages: number
  // 每小时分解统计
  hourly_breakdown: Array<{ hour: number; count: number }>
}

// 获取命令消息记录列表
export function page(params: any): Promise<ResponseStruct<TelegramCommandMessageVo[]>> {
  return useHttp().get('/admin/tg_game/command_message/list', { params })
}

// 根据群组ID查询命令消息
export function getByGroupId(groupId: number, params?: any): Promise<ResponseStruct<TelegramCommandMessageVo[]>> {
  return useHttp().get(`/admin/tg_game/command_message/by_group/${groupId}`, { params })
}

// 根据TG用户ID查询命令消息
export function getByUserId(tgUserId: number, params?: any): Promise<ResponseStruct<TelegramCommandMessageVo[]>> {
  return useHttp().get(`/admin/tg_game/command_message/by_user/${tgUserId}`, { params })
}

// 根据命令类型查询消息
export function getByCommand(command: string, params?: any): Promise<ResponseStruct<TelegramCommandMessageVo[]>> {
  return useHttp().get(`/admin/tg_game/command_message/by_command/${command}`, { params })
}

// 获取命令消息统计
export function statistics(params?: any): Promise<ResponseStruct<CommandStatisticsVo>> {
  return useHttp().get('/admin/tg_game/command_message/statistics', { params })
}

// 获取当日命令消息统计
export function getDailyStatistics(params?: any): Promise<ResponseStruct<DailyStatisticsVo>> {
  return useHttp().get('/admin/tg_game/command_message/daily_statistics', { params })
}

// 导出命令消息记录
export function exportData(params?: any): Promise<any> {
  return useHttp().get('/admin/tg_game/command_message/export', { params, responseType: 'blob' })
}

// 获取命令消息详情
export function detail(id: number): Promise<ResponseStruct<TelegramCommandMessageVo>> {
  return useHttp().get(`/admin/tg_game/command_message/${id}`)
}

// 删除命令消息(软删除)
export function deleteByIds(ids: number[]): Promise<ResponseStruct<null>> {
  return useHttp().delete('/admin/tg_game/command_message', { data: ids })
}

// 真实删除命令消息
export function realDelete(ids: number[]): Promise<ResponseStruct<null>> {
  return useHttp().delete('/admin/tg_game/command_message/real_delete', { data: ids })
}
