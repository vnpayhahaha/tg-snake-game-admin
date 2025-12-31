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
 * 蛇身节点表格列配置
 */
import type { MaProTableColumns, MaProTableExpose } from '@mineadmin/pro-table'
import type { SnakeNodeVo } from '~/game/api/SnakeNode.ts'
import type { UseDialogExpose } from '@/hooks/useDialog.ts'
import hasAuth from '@/utils/permission/hasAuth.ts'
import { archive, deleteByIds, updateStatus } from '~/game/api/SnakeNode.ts'
import { useMessage } from '@/hooks/useMessage.ts'
import { ResultCode } from '@/utils/ResultCode.ts'
import { selectStatus } from '@/modules/Common'

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
      width: 320,
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
      width: 340,
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
            api: () => new Promise(resolve => resolve(selectStatus('tg_snake_node', 'status_list'))),
            dataHandle: (response: any) => {
              return response.data?.map((item: Common.StatusOptionItem) => {
                return { label: `${item.label}`, value: item.value }
              })
            },
            props: {
              effect: 'dark',
            },
          },
      },
    },
    {
      label: () => t('snakeNode.matched_prize_id'),
      prop: 'matched_prize_id',
      width: 120,
    },
    {
      label: () => t('snakeNode.created_at'),
      prop: 'created_at',
      width: 180,
    },
  ]
}
