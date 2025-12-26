import type { ResponseStruct } from '#/global'

export interface DispatchQueueVo {
  // 主键ID
  id: number
  // 中奖记录ID
  prize_record_id: number
  // 中奖转账ID
  prize_transfer_id: number
  // 群组ID
  group_id: number
  // 开奖流水号
  prize_serial_no: string
  // 优先级
  priority: number
  // 状态：1-待处理，2-处理中，3-已完成，4-失败
  status: number
  // 重试次数
  retry_count: number
  // 最大重试次数
  max_retry: number
  // 任务数据（JSON）
  task_data: string
  // 错误信息
  error_message: string
  // 计划执行时间
  scheduled_at: string
  // 开始执行时间
  started_at: string
  // 完成时间
  completed_at: string
  // 版本号
  version: number
  // 创建时间
  created_at: string
}

export interface BatchRetryResultVo {
  total: number
  success: number
  failed: number
}

// 获取派奖队列列表
export function page(params: any): Promise<ResponseStruct<DispatchQueueVo[]>> {
  return useHttp().get('/admin/tg_game/dispatch_queue/list', { params })
}

// 获取待处理派奖队列
export function getPending(): Promise<ResponseStruct<DispatchQueueVo[]>> {
  return useHttp().get('/admin/tg_game/dispatch_queue/pending')
}

// 获取失败派奖队列
export function getFailed(): Promise<ResponseStruct<DispatchQueueVo[]>> {
  return useHttp().get('/admin/tg_game/dispatch_queue/failed')
}

// 根据中奖记录查询派奖队列
export function getByPrizeId(prizeId: number): Promise<ResponseStruct<DispatchQueueVo>> {
  return useHttp().get(`/admin/tg_game/dispatch_queue/by_prize/${prizeId}`)
}

// 手动重试派发
export function retry(id: number): Promise<ResponseStruct<{ success: boolean; message: string }>> {
  return useHttp().post(`/admin/tg_game/dispatch_queue/${id}/retry`)
}

// 批量重试失败派发
export function batchRetry(data: { queue_ids: number[] }): Promise<ResponseStruct<BatchRetryResultVo>> {
  return useHttp().post('/admin/tg_game/dispatch_queue/batch_retry', data)
}

// 手动标记为成功
export function markSuccess(id: number): Promise<ResponseStruct<null>> {
  return useHttp().post(`/admin/tg_game/dispatch_queue/${id}/mark_success`)
}

// 删除派奖队列
export function deleteByIds(ids: number[]): Promise<ResponseStruct<null>> {
  return useHttp().delete('/admin/tg_game/dispatch_queue', { data: ids })
}
