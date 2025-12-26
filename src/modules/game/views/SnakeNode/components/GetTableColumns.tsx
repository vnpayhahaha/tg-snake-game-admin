/**
 * 蛇身节点表格列配置
 */
import type { MaProTableColumns, MaProTableExpose } from '@mineadmin/pro-table'
import type { SnakeNodeVo } from '~/game/api/SnakeNode.ts'
import type { UseDialogExpose } from '@/hooks/useDialog.ts'
import hasAuth from '@/utils/permission/hasAuth.ts'
import { archive, deleteByIds, updateStatus } from '~/game/api/SnakeNode.ts'
import { useMessage } from '@/hooks/useMessage.ts'
import { ResultCode } from '@/utils/ResultCode.ts'

export default function getTableColumns(
  dialog: UseDialogExpose,
  t: any,
  proTableRef: any
): MaProTableColumns {
  const msg = useMessage()

  // 检查是否显示按钮
  const showBtn = (auth: string | string[], row?: SnakeNodeVo) => {
    if (Array.isArray(auth)) {
      return auth.some(item => hasAuth(item))
    }
    return hasAuth(auth)
  }

  // 归档节点
  const handleArchive = (row: SnakeNodeVo) => {
    msg.confirm(t('snakeNode.archiveConfirm')).then(async () => {
      const response = await archive(row.id)
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
  const handleUpdateStatus = (row: SnakeNodeVo, status: number) => {
    msg.confirm(t('snakeNode.updateStatusConfirm')).then(async () => {
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

  // 删除节点
  const handleDelete = (row: SnakeNodeVo) => {
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
      label: () => t('snakeNode.id'),
      prop: 'id',
      width: 80,
    },
    {
      label: () => t('snakeNode.group_id'),
      prop: 'group_id',
      width: 100,
    },
    {
      label: () => t('snakeNode.wallet_cycle'),
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
      label: () => t('snakeNode.ticket_number'),
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
      label: () => t('snakeNode.ticket_serial_no'),
      prop: 'ticket_serial_no',
      width: 180,
      showOverflowTooltip: true,
    },
    {
      label: () => t('snakeNode.player_address'),
      prop: 'player_address',
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
      label: () => t('snakeNode.player_tg_username'),
      prop: 'player_tg_username',
      width: 150,
    },
    {
      label: () => t('snakeNode.player_tg_user_id'),
      prop: 'player_tg_user_id',
      width: 130,
    },
    {
      label: () => t('snakeNode.amount'),
      prop: 'amount',
      width: 120,
      cellRenderTo: {
        name: 'nmCellEnhance',
        props: {
          type: 'tag',
          effect: 'dark',
          color: 'success',
          format: (row: SnakeNodeVo) => `${row.amount} TRX`,
        },
      },
    },
    {
      label: () => t('snakeNode.tx_hash'),
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
      label: () => t('snakeNode.block_height'),
      prop: 'block_height',
      width: 120,
    },
    {
      label: () => t('snakeNode.daily_sequence'),
      prop: 'daily_sequence',
      width: 120,
      cellRenderTo: {
        name: 'nmCellEnhance',
        props: {
          type: 'tag',
          effect: 'plain',
          format: (row: SnakeNodeVo) => `#${row.daily_sequence}`,
        },
      },
    },
    {
      label: () => t('snakeNode.status'),
      prop: 'status',
      width: 100,
      cellRenderTo: {
        name: 'nmCellEnhance',
        props: {
          type: 'tag',
          format: (row: SnakeNodeVo) => {
            const statusMap: Record<number, { label: string, color: string }> = {
              1: { label: t('snakeNode.status_active'), color: 'success' },
              2: { label: t('snakeNode.status_matched'), color: 'warning' },
              3: { label: t('snakeNode.status_unmatched'), color: 'info' },
            }
            return statusMap[row.status]?.label || t('crud.unknown')
          },
          color: (row: SnakeNodeVo) => {
            const statusMap: Record<number, string> = {
              1: 'success',
              2: 'warning',
              3: 'info',
            }
            return statusMap[row.status] || 'info'
          },
        },
      },
    },
    {
      label: () => t('snakeNode.matched_prize_id'),
      prop: 'matched_prize_id',
      width: 120,
      cellRenderTo: {
        name: 'nmCellEnhance',
        props: {
          type: 'tag',
          effect: 'plain',
          format: (row: SnakeNodeVo) => row.matched_prize_id ? `#${row.matched_prize_id}` : '-',
        },
      },
    },
    {
      label: () => t('snakeNode.created_at'),
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
            name: 'archive',
            show: (row: SnakeNodeVo) => showBtn('tg_game:snake_node:archive') && row.status === 1,
            text: () => t('snakeNode.archive'),
            onClick: ({ row }: any) => handleArchive(row),
            actionType: 'warning',
          },
          {
            name: 'updateStatusToActive',
            show: (row: SnakeNodeVo) => showBtn('tg_game:snake_node:updateStatus') && row.status !== 1,
            text: () => t('snakeNode.setActive'),
            onClick: ({ row }: any) => handleUpdateStatus(row, 1),
            actionType: 'success',
          },
          {
            name: 'delete',
            show: () => showBtn('tg_game:snake_node:delete'),
            text: () => t('crud.delete'),
            onClick: ({ row }: any) => handleDelete(row),
            actionType: 'danger',
          },
        ],
        moreActions: [
          {
            name: 'viewTxHash',
            show: (row: SnakeNodeVo) => !!row.tx_hash,
            text: () => t('snakeNode.viewTxHash'),
            onClick: ({ row }: any) => {
              window.open(`https://tronscan.org/#/transaction/${row.tx_hash}`, '_blank')
            },
          },
        ],
      },
    },
  ]
}
