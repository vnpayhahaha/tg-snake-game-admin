/**
 * 游戏群组表格列配置
 */
import type { MaProTableColumns, MaProTableExpose } from '@mineadmin/pro-table'
import type { GameGroupVo } from '~/game/api/GameGroup.ts'
import type { UseDialogExpose } from '@/hooks/useDialog.ts'

import { useMessage } from '@/hooks/useMessage.ts'
import { deleteByIds, resetPrizePool, getCurrentSnake } from '~/game/api/GameGroup.ts'
import { ResultCode } from '@/utils/ResultCode.ts'
import hasAuth from '@/utils/permission/hasAuth.ts'

export default function getTableColumns(
  dialog: UseDialogExpose,
  t: any
): MaProTableColumns[] {
  const msg = useMessage()

  const showBtn = (auth: string | string[], row: GameGroupVo) => {
    return hasAuth(auth)
  }

  return [
    // 多选列
    {
      type: 'selection',
      showOverflowTooltip: false,
      label: () => t('crud.selection'),
    },
    // 索引序号列
    { type: 'index' },
    // 配置ID
    {
      label: () => t('gameGroup.config_id'),
      prop: 'config_id',
      width: '100px',
    },
    // Telegram群组ID
    {
      label: () => t('gameGroup.tg_chat_id'),
      prop: 'tg_chat_id',
      width: '150px',
    },
    // 奖池金额
    {
      label: () => t('gameGroup.prize_pool_amount'),
      prop: 'prize_pool_amount',
      width: '120px',
      cellRenderTo: {
        name: 'nmCellEnhance',
        props: {
          type: 'tag',
          tagType: (row: GameGroupVo) => {
            return row.prize_pool_amount > 1000 ? 'success' : 'info'
          },
          format: (row: GameGroupVo) => `${row.prize_pool_amount} TRX`,
        },
      },
    },
    // 蛇身长度
    {
      label: () => t('gameGroup.snake_length'),
      prop: 'current_snake_nodes',
      width: '100px',
      cellRenderTo: {
        name: 'nmCellEnhance',
        props: {
          type: 'text',
          format: (row: GameGroupVo) => {
            const nodes = row.current_snake_nodes ? row.current_snake_nodes.split(',') : []
            return nodes.length
          },
        },
      },
    },
    // 上次中奖金额
    {
      label: () => t('gameGroup.last_prize_amount'),
      prop: 'last_prize_amount',
      width: '130px',
      cellRenderTo: {
        name: 'nmCellEnhance',
        props: {
          type: 'text',
          format: (row: GameGroupVo) => {
            return row.last_prize_amount ? `${row.last_prize_amount} TRX` : '-'
          },
        },
      },
    },
    // 上次中奖时间
    {
      label: () => t('gameGroup.last_prize_at'),
      prop: 'last_prize_at',
      width: '160px',
      cellRenderTo: {
        name: 'nmCellEnhance',
        props: {
          type: 'text',
          format: (row: GameGroupVo) => row.last_prize_at || '-',
        },
      },
    },
    // 创建时间
    {
      label: () => t('gameGroup.created_at'),
      prop: 'created_at',
      width: '160px',
    },
    // 操作列
    {
      type: 'operation',
      label: () => t('crud.operation'),
      operationConfigure: {
        type: 'tile',
        actions: [
          {
            name: 'viewSnake',
            show: () => true,
            text: () => t('gameGroup.viewSnake'),
            on: {
              click: async (row: GameGroupVo, proxy: MaProTableExpose) => {
                try {
                  const res = await getCurrentSnake(row.id)
                  if (res.code === ResultCode.SUCCESS) {
                    msg.info(`蛇身长度: ${res.data.current_length}, 奖池: ${res.data.prize_pool_amount} TRX`)
                  }
                }
                catch (err: any) {
                  msg.error(err.message)
                }
              },
            },
          },
          {
            name: 'edit',
            show: (row: GameGroupVo) => showBtn('tg_game:group:update', row),
            text: () => t('crud.edit'),
            on: {
              click: (row: GameGroupVo, proxy: MaProTableExpose) => {
                dialog.setTitle(t('crud.edit'))
                dialog.open({ formType: 'edit', data: row })
              },
            },
          },
          {
            name: 'resetPrizePool',
            show: (row: GameGroupVo) => showBtn('tg_game:group:resetPrizePool', row),
            text: () => t('gameGroup.resetPrizePool'),
            on: {
              click: async (row: GameGroupVo, proxy: MaProTableExpose) => {
                msg.confirm(t('gameGroup.resetPrizePoolConfirm')).then(async () => {
                  const res = await resetPrizePool(row.id)
                  if (res.code === ResultCode.SUCCESS) {
                    msg.success(t('crud.success'))
                    proxy.refresh()
                  }
                })
              },
            },
          },
          {
            name: 'delete',
            show: (row: GameGroupVo) => showBtn('tg_game:group:delete', row),
            text: () => t('crud.delete'),
            type: 'danger',
            on: {
              click: async (row: GameGroupVo, proxy: MaProTableExpose) => {
                msg.delConfirm(t('crud.delMessage')).then(async () => {
                  const res = await deleteByIds([row.id])
                  if (res.code === ResultCode.SUCCESS) {
                    msg.success(t('crud.delSuccess'))
                    proxy.refresh()
                  }
                })
              },
            },
          },
        ],
      },
    },
  ]
}
