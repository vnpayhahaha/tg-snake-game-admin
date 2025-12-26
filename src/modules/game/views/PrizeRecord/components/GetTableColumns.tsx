/**
 * 中奖记录表格列配置
 */
import type { MaProTableColumns, MaProTableExpose } from '@mineadmin/pro-table'
import type { PrizeRecordVo } from '~/game/api/PrizeRecord.ts'
import type { UseDialogExpose } from '@/hooks/useDialog.ts'
import hasAuth from '@/utils/permission/hasAuth.ts'
import { deleteByIds, reprocess, updateStatus } from '~/game/api/PrizeRecord.ts'
import { useMessage } from '@/hooks/useMessage.ts'
import { ResultCode } from '@/utils/ResultCode.ts'

export default function getTableColumns(
  dialog: UseDialogExpose,
  t: any,
  proTableRef: any
): MaProTableColumns {
  const msg = useMessage()

  // 检查是否显示按钮
  const showBtn = (auth: string | string[], row?: PrizeRecordVo) => {
    if (Array.isArray(auth)) {
      return auth.some(item => hasAuth(item))
    }
    return hasAuth(auth)
  }

  // 查看转账详情
  const handleViewTransfers = (row: PrizeRecordVo) => {
    dialog.setTitle(t('prizeRecord.viewTransfers'))
    dialog.open({ formType: 'viewTransfers', data: row })
  }

  // 重新处理派发
  const handleReprocess = (row: PrizeRecordVo) => {
    msg.confirm(t('prizeRecord.reprocessConfirm')).then(async () => {
      const response = await reprocess(row.id)
      if (response.code === ResultCode.SUCCESS) {
        msg.success(t('crud.success'))
        proTableRef.value?.refresh()
      }
      else {
        msg.error(response.message)
      }
    })
  }

  // 更新状态
  const handleUpdateStatus = (row: PrizeRecordVo, status: number) => {
    msg.confirm(t('prizeRecord.updateStatusConfirm')).then(async () => {
      const response = await updateStatus(row.id, { status })
      if (response.code === ResultCode.SUCCESS) {
        msg.success(t('crud.updateSuccess'))
        proTableRef.value?.refresh()
      }
      else {
        msg.error(response.message)
      }
    })
  }

  // 删除记录
  const handleDelete = (row: PrizeRecordVo) => {
    msg.delConfirm(t('crud.delMessage')).then(async () => {
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
    // { type: 'selection', showOverflowTooltip: false, label: () => t('crud.selection') },
    // { type: 'index', label: () => t('crud.index'), width: 70 },
    {
      label: () => t('prizeRecord.id'),
      prop: 'id',
      width: 80,
    },
    {
      label: () => t('prizeRecord.group_id'),
      prop: 'group_id',
      width: 100,
    },
    {
      label: () => t('prizeRecord.prize_serial_no'),
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
      label: () => t('prizeRecord.wallet_cycle'),
      prop: 'wallet_cycle',
      width: 100,
      cellRenderTo: {
        name: 'nmCellEnhance',
        props: {
          type: 'tag',
          effect: 'plain',
        },
      },
    },
    {
      label: () => t('prizeRecord.ticket_number'),
      prop: 'ticket_number',
      width: 100,
      cellRenderTo: {
        name: 'nmCellEnhance',
        props: {
          type: 'tag',
          color: 'primary',
        },
      },
    },
    {
      label: () => t('prizeRecord.winner_count'),
      prop: 'winner_count',
      width: 100,
      cellRenderTo: {
        name: 'nmCellEnhance',
        props: {
          type: 'tag',
          effect: 'dark',
          color: 'warning',
          format: (row: PrizeRecordVo) => `${row.winner_count} 人`,
        },
      },
    },
    {
      label: () => t('prizeRecord.total_amount'),
      prop: 'total_amount',
      width: 120,
      cellRenderTo: {
        name: 'nmCellEnhance',
        props: {
          type: 'tag',
          effect: 'plain',
          format: (row: PrizeRecordVo) => `${row.total_amount} TRX`,
        },
      },
    },
    {
      label: () => t('prizeRecord.platform_fee'),
      prop: 'platform_fee',
      width: 120,
      cellRenderTo: {
        name: 'nmCellEnhance',
        props: {
          type: 'tag',
          effect: 'plain',
          color: 'info',
          format: (row: PrizeRecordVo) => `${row.platform_fee} TRX`,
        },
      },
    },
    {
      label: () => t('prizeRecord.prize_pool'),
      prop: 'prize_pool',
      width: 120,
      cellRenderTo: {
        name: 'nmCellEnhance',
        props: {
          type: 'tag',
          effect: 'dark',
          color: 'success',
          format: (row: PrizeRecordVo) => `${row.prize_pool} TRX`,
        },
      },
    },
    {
      label: () => t('prizeRecord.prize_amount'),
      prop: 'prize_amount',
      width: 120,
      cellRenderTo: {
        name: 'nmCellEnhance',
        props: {
          type: 'tag',
          effect: 'dark',
          color: 'warning',
          format: (row: PrizeRecordVo) => `${row.prize_amount} TRX`,
        },
      },
    },
    {
      label: () => t('prizeRecord.prize_per_winner'),
      prop: 'prize_per_winner',
      width: 130,
      cellRenderTo: {
        name: 'nmCellEnhance',
        props: {
          type: 'tag',
          effect: 'dark',
          color: 'success',
          format: (row: PrizeRecordVo) => `${row.prize_per_winner} TRX`,
        },
      },
    },
    {
      label: () => t('prizeRecord.pool_remaining'),
      prop: 'pool_remaining',
      width: 120,
      cellRenderTo: {
        name: 'nmCellEnhance',
        props: {
          type: 'tag',
          effect: 'plain',
          format: (row: PrizeRecordVo) => `${row.pool_remaining} TRX`,
        },
      },
    },
    {
      label: () => t('prizeRecord.status'),
      prop: 'status',
      width: 100,
      cellRenderTo: {
        name: 'nmCellEnhance',
        props: {
          type: 'tag',
          format: (row: PrizeRecordVo) => {
            const statusMap: Record<number, { label: string, color: string }> = {
              1: { label: t('prizeRecord.status_pending'), color: 'info' },
              2: { label: t('prizeRecord.status_processing'), color: 'warning' },
              3: { label: t('prizeRecord.status_completed'), color: 'success' },
              4: { label: t('prizeRecord.status_failed'), color: 'danger' },
              5: { label: t('prizeRecord.status_partial_failed'), color: 'warning' },
            }
            return statusMap[row.status]?.label || t('crud.unknown')
          },
          color: (row: PrizeRecordVo) => {
            const statusMap: Record<number, string> = {
              1: 'info',
              2: 'warning',
              3: 'success',
              4: 'danger',
              5: 'warning',
            }
            return statusMap[row.status] || 'info'
          },
        },
      },
    },
    {
      label: () => t('prizeRecord.created_at'),
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
            name: 'viewTransfers',
            show: () => showBtn('tg_game:prize:viewTransfers'),
            text: () => t('prizeRecord.viewTransfers'),
            onClick: ({ row }: any) => handleViewTransfers(row),
            actionType: 'primary',
          },
          {
            name: 'reprocess',
            show: (row: PrizeRecordVo) => showBtn('tg_game:prize:reprocess') && [4, 5].includes(row.status),
            text: () => t('prizeRecord.reprocess'),
            onClick: ({ row }: any) => handleReprocess(row),
            actionType: 'warning',
          },
          {
            name: 'delete',
            show: () => showBtn('tg_game:prize:delete'),
            text: () => t('crud.delete'),
            onClick: ({ row }: any) => handleDelete(row),
            actionType: 'danger',
          },
        ],
      },
    },
  ]
}
