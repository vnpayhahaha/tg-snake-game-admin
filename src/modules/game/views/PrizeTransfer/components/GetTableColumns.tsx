/**
 * 中奖转账表格列配置
 */
import type { MaProTableColumns, MaProTableExpose } from '@mineadmin/pro-table'
import type { PrizeTransferVo } from '~/game/api/PrizeTransfer.ts'
import type { UseDialogExpose } from '@/hooks/useDialog.ts'
import hasAuth from '@/utils/permission/hasAuth.ts'
import { deleteByIds, markSuccess, retry } from '~/game/api/PrizeTransfer.ts'
import { useMessage } from '@/hooks/useMessage.ts'
import { ResultCode } from '@/utils/ResultCode.ts'

export default function getTableColumns(
  dialog: UseDialogExpose,
  t: any,
  proTableRef: any
): MaProTableColumns {
  const msg = useMessage()

  // 检查是否显示按钮
  const showBtn = (auth: string | string[], row?: PrizeTransferVo) => {
    if (Array.isArray(auth)) {
      return auth.some(item => hasAuth(item))
    }
    return hasAuth(auth)
  }

  // 重试转账
  const handleRetry = (row: PrizeTransferVo) => {
    msg.confirm(t('prizeTransfer.retryConfirm')).then(async () => {
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
  const handleMarkSuccess = (row: PrizeTransferVo) => {
    msg.prompt(t('prizeTransfer.markSuccessPrompt'), {
      confirmButtonText: t('crud.confirm'),
      cancelButtonText: t('crud.cancel'),
      inputPlaceholder: t('prizeTransfer.txHashPlaceholder'),
    }).then(async ({ value }: any) => {
      const response = await markSuccess(row.id, { tx_hash: value })
      if (response.code === ResultCode.SUCCESS) {
        msg.success(t('crud.success'))
        proTableRef.value?.refresh()
      }
      else {
        msg.error(response.message)
      }
    }).catch(() => {})
  }

  // 删除记录
  const handleDelete = (row: PrizeTransferVo) => {
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
      label: () => t('prizeTransfer.id'),
      prop: 'id',
      width: 80,
    },
    {
      label: () => t('prizeTransfer.prize_record_id'),
      prop: 'prize_record_id',
      width: 120,
    },
    {
      label: () => t('prizeTransfer.prize_serial_no'),
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
      label: () => t('prizeTransfer.node_id'),
      prop: 'node_id',
      width: 100,
    },
    {
      label: () => t('prizeTransfer.to_address'),
      prop: 'to_address',
      width: 200,
      showOverflowTooltip: true,
      cellRenderTo: {
        name: 'nmCellEnhance',
        props: {
          type: 'copyable',
        },
      },
    },
    {
      label: () => t('prizeTransfer.amount'),
      prop: 'amount',
      width: 120,
      cellRenderTo: {
        name: 'nmCellEnhance',
        props: {
          type: 'tag',
          effect: 'dark',
          color: 'success',
          format: (row: PrizeTransferVo) => `${row.amount} TRX`,
        },
      },
    },
    {
      label: () => t('prizeTransfer.tx_hash'),
      prop: 'tx_hash',
      width: 200,
      showOverflowTooltip: true,
      cellRenderTo: {
        name: 'nmCellEnhance',
        props: {
          type: 'copyable',
        },
      },
    },
    {
      label: () => t('prizeTransfer.status'),
      prop: 'status',
      width: 100,
      cellRenderTo: {
        name: 'nmCellEnhance',
        props: {
          type: 'tag',
          format: (row: PrizeTransferVo) => {
            const statusMap: Record<number, { label: string, color: string }> = {
              1: { label: t('prizeTransfer.status_pending'), color: 'info' },
              2: { label: t('prizeTransfer.status_processing'), color: 'warning' },
              3: { label: t('prizeTransfer.status_success'), color: 'success' },
              4: { label: t('prizeTransfer.status_failed'), color: 'danger' },
            }
            return statusMap[row.status]?.label || t('crud.unknown')
          },
          color: (row: PrizeTransferVo) => {
            const statusMap: Record<number, string> = {
              1: 'info',
              2: 'warning',
              3: 'success',
              4: 'danger',
            }
            return statusMap[row.status] || 'info'
          },
        },
      },
    },
    {
      label: () => t('prizeTransfer.retry_count'),
      prop: 'retry_count',
      width: 100,
      cellRenderTo: {
        name: 'nmCellEnhance',
        props: {
          type: 'tag',
          effect: 'plain',
          color: (row: PrizeTransferVo) => row.retry_count > 3 ? 'danger' : row.retry_count > 0 ? 'warning' : 'info',
        },
      },
    },
    {
      label: () => t('prizeTransfer.error_message'),
      prop: 'error_message',
      minWidth: 200,
      showOverflowTooltip: true,
    },
    {
      label: () => t('prizeTransfer.created_at'),
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
            show: (row: PrizeTransferVo) => showBtn('tg_game:prize_transfer:retry') && row.status === 4,
            text: () => t('prizeTransfer.retry'),
            onClick: ({ row }: any) => handleRetry(row),
            actionType: 'warning',
          },
          {
            name: 'markSuccess',
            show: (row: PrizeTransferVo) => showBtn('tg_game:prize_transfer:markSuccess') && row.status === 4,
            text: () => t('prizeTransfer.markSuccess'),
            onClick: ({ row }: any) => handleMarkSuccess(row),
            actionType: 'success',
          },
          {
            name: 'delete',
            show: () => showBtn('tg_game:prize_transfer:delete'),
            text: () => t('crud.delete'),
            onClick: ({ row }: any) => handleDelete(row),
            actionType: 'danger',
          },
        ],
        moreActions: [
          {
            name: 'viewTxHash',
            show: (row: PrizeTransferVo) => !!row.tx_hash,
            text: () => t('prizeTransfer.viewTxHash'),
            onClick: ({ row }: any) => {
              window.open(`https://tronscan.org/#/transaction/${row.tx_hash}`, '_blank')
            },
          },
        ],
      },
    },
  ]
}
