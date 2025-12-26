/**
 * MineAdmin is committed to providing solutions for quickly building web applications
 * Please view the LICENSE file that was distributed with this source code,
 * For the full copyright and license information.
 * Thank you very much for using MineAdmin.
 *
 * @Author X.Mo<root@imoi.cn>
 * @Link   https://github.com/mineadmin
 */

/**
 * 派奖队列表格列配置
 */
import type { MaProTableColumns } from '@mineadmin/pro-table'
import type { DispatchQueueVo } from '~/game/api/DispatchQueue.ts'
import hasAuth from '@/utils/permission/hasAuth.ts'
import { retry, markSuccess, deleteByIds } from '~/game/api/DispatchQueue.ts'
import { useMessage } from '@/hooks/useMessage.ts'
import { ResultCode } from '@/utils/ResultCode.ts'

export default function getTableColumns(
  t: any,
  proTableRef: any
): MaProTableColumns {
  const msg = useMessage()

  // 状态映射
  const statusMap: Record<number, string> = {
    1: t('dispatchQueue.statusPending'),
    2: t('dispatchQueue.statusProcessing'),
    3: t('dispatchQueue.statusCompleted'),
    4: t('dispatchQueue.statusFailed'),
    5: '已取消',
  }

  // 状态颜色映射
  const statusColorMap: Record<number, string> = {
    1: 'warning',
    2: 'primary',
    3: 'success',
    4: 'danger',
    5: 'info',
  }

  const showBtn = (auth: string | string[]) => {
    if (Array.isArray(auth)) {
      return auth.some(item => hasAuth(item))
    }
    return hasAuth(auth)
  }

  // 重试派发
  const handleRetry = (row: DispatchQueueVo) => {
    msg.confirm(t('dispatchQueue.retryConfirm')).then(async () => {
      const response = await retry(row.id)
      if (response.code === ResultCode.SUCCESS) {
        msg.success(t('crud.success'))
        proTableRef.value?.refresh()
      }
      else {
        msg.error(response.message)
      }
    })
  }

  // 标记为成功
  const handleMarkSuccess = (row: DispatchQueueVo) => {
    msg.confirm(t('dispatchQueue.markSuccessConfirm')).then(async () => {
      const response = await markSuccess(row.id)
      if (response.code === ResultCode.SUCCESS) {
        msg.success(t('crud.success'))
        proTableRef.value?.refresh()
      }
      else {
        msg.error(response.message)
      }
    })
  }

  // 删除记录
  const handleDelete = (row: DispatchQueueVo) => {
    msg.confirm(t('crud.delMessage')).then(async () => {
      const response = await deleteByIds([row.id])
      if (response.code === ResultCode.SUCCESS) {
        msg.success(t('crud.delSuccess'))
        proTableRef.value?.refresh()
      }
      else {
        msg.error(response.message)
      }
    })
  }

  return [
    { type: 'selection', showOverflowTooltip: false, label: () => t('crud.selection') },
    {
      label: () => 'ID',
      prop: 'id',
      width: 80,
    },
    {
      label: () => t('dispatchQueue.prize_record_id'),
      prop: 'prize_record_id',
      width: 120,
    },
    {
      label: () => t('dispatchQueue.prize_transfer_id'),
      prop: 'prize_transfer_id',
      width: 120,
    },
    {
      label: () => t('dispatchQueue.group_id'),
      prop: 'group_id',
      width: 100,
    },
    {
      label: () => t('dispatchQueue.prize_serial_no'),
      prop: 'prize_serial_no',
      width: 180,
      showOverflowTooltip: true,
      cellRenderTo: {
        name: 'nmCellEnhance',
        props: {
          type: 'copyable',
        },
      },
    },
    {
      label: () => t('dispatchQueue.priority'),
      prop: 'priority',
      width: 80,
    },
    {
      label: () => t('dispatchQueue.status'),
      prop: 'status',
      width: 100,
      cellRenderTo: {
        name: 'nmCellEnhance',
        props: {
          type: 'tag',
          format: (row: DispatchQueueVo) => statusMap[row.status] || '未知',
          color: (row: DispatchQueueVo) => statusColorMap[row.status] || 'info',
        },
      },
    },
    {
      label: () => t('dispatchQueue.retry_count'),
      prop: 'retry_count',
      width: 100,
    },
    {
      label: () => t('dispatchQueue.max_retry'),
      prop: 'max_retry',
      width: 100,
    },
    {
      label: () => t('dispatchQueue.error_message'),
      prop: 'error_message',
      minWidth: 200,
      showOverflowTooltip: true,
    },
    {
      label: () => t('dispatchQueue.scheduled_at'),
      prop: 'scheduled_at',
      width: 180,
    },
    {
      label: () => t('dispatchQueue.started_at'),
      prop: 'started_at',
      width: 180,
    },
    {
      label: () => t('dispatchQueue.completed_at'),
      prop: 'completed_at',
      width: 180,
    },
    {
      label: () => t('dispatchQueue.created_at'),
      prop: 'created_at',
      width: 180,
    },
    {
      label: () => t('crud.operation'),
      fixed: 'right',
      type: 'operation',
      showOverflowTooltip: false,
      operationConfigure: {
        actions: [
          {
            name: 'retry',
            show: (row: DispatchQueueVo) => showBtn('tg_game:dispatch_queue:retry') && (row.status === 1 || row.status === 4),
            text: () => t('dispatchQueue.retry'),
            onClick: ({ row }: any) => handleRetry(row),
            actionType: 'warning',
          },
          {
            name: 'markSuccess',
            show: (row: DispatchQueueVo) => showBtn('tg_game:dispatch_queue:markSuccess') && row.status === 4,
            text: () => t('dispatchQueue.markSuccess'),
            onClick: ({ row }: any) => handleMarkSuccess(row),
            actionType: 'success',
          },
          {
            name: 'delete',
            show: () => showBtn('tg_game:dispatch_queue:delete'),
            text: () => t('crud.delete'),
            onClick: ({ row }: any) => handleDelete(row),
            actionType: 'danger',
          },
        ],
      },
    },
  ]
}
