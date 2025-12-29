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
      hide: true
    },
    // Telegram群组title
    {
      label: () => t('gameGroup.tg_chat_title'),
      prop: 'config.tg_chat_title',
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
      cellRender: ({ row }) => {
        const nodes: string[] = row.current_snake_nodes ? row.current_snake_nodes.split(',').filter(Boolean) : []

        // 计算已中奖节点数量（相同数字首尾匹配，已中奖节点不再参与后续匹配）
        const winningIndices: Set<number> = new Set()
        const lastPosition: Map<string, number> = new Map()

        for (let i = 0; i < nodes.length; i++) {
          const node = nodes[i]
          if (lastPosition.has(node)) {
            const prevPos = lastPosition.get(node)!
            if (!winningIndices.has(prevPos)) {
              for (let j = prevPos; j <= i; j++) {
                winningIndices.add(j)
              }
              lastPosition.delete(node)
            } else {
              lastPosition.set(node, i)
            }
          } else {
            lastPosition.set(node, i)
          }
        }

        const effectiveLength = nodes.length - winningIndices.size
        const totalLength = nodes.length

        if (winningIndices.size > 0) {
          return h('span', {}, [
            h('span', { style: { fontWeight: 'bold' } }, `${effectiveLength}`),
            h('span', { style: { color: '#999', marginLeft: '4px' } }, `(${t('gameGroup.total')}${totalLength})`)
          ])
        }
        return h('span', {}, `${effectiveLength}`)
      },
    },
    // 上次中奖金额
    {
      label: () => t('gameGroup.last_prize_amount'),
      prop: 'last_prize_amount',
      width: '130px',
    },
    // 上次中奖时间
    {
      label: () => t('gameGroup.last_prize_at'),
      prop: 'last_prize_at',
      width: '180px',
    },
    // 创建时间
    {
      label: () => t('gameGroup.created_at'),
      prop: 'created_at',
      width: '180px',
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
            onClick: ({ row }) => {
              dialog.setTitle(t('gameGroup.viewSnake'))
              dialog.open({ formType: 'viewSnake', data: row })
            },
          },
          {
            name: 'resetPrizePool',
            show: ({ row }) => showBtn('tg_game:group:resetPrizePool', row),
            text: () => t('gameGroup.resetPrizePool'),
            onClick: async ({ row }, proxy: MaProTableExpose) => {
              msg.confirm(t('gameGroup.resetPrizePoolConfirm')).then(async () => {
                const res = await resetPrizePool(row.id)
                if (res.code === ResultCode.SUCCESS) {
                  msg.success(t('crud.success'))
                  proxy.refresh()
                }
              })
            },
          },
        ],
      },
    },
  ]
}
