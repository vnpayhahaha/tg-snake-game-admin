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
 * 配置变更日志表格列配置
 */
import type { MaProTableColumns } from '@mineadmin/pro-table'
import type { GameGroupConfigLogVo } from '~/game/api/GameGroupConfigLog.ts'

export default function getTableColumns(
  t: any,
  proTableRef: any
): MaProTableColumns {
  // 变更来源映射
  const changeSourceMap: Record<number, string> = {
    1: t('gameGroupConfigLog.sourceAdmin'),
    2: t('gameGroupConfigLog.sourceTelegram'),
    3: t('gameGroupConfigLog.sourceSystem'),
  }

  // 变更来源颜色映射
  const changeSourceColorMap: Record<number, string> = {
    1: 'primary',
    2: 'success',
    3: 'info',
  }

  return [
    {
      label: () => 'ID',
      prop: 'id',
      width: 80,
    },
    {
      label: () => t('gameGroupConfigLog.config_id'),
      prop: 'config_id',
      width: 100,
    },
    {
      label: () => 'Telegram群组ID',
      prop: 'tg_chat_id',
      width: 150,
      cellRenderTo: {
        name: 'nmCellEnhance',
        props: {
          type: 'copyable',
        },
      },
    },
    {
      label: () => t('gameGroupConfigLog.source'),
      prop: 'change_source',
      width: 120,
      cellRenderTo: {
        name: 'nmCellEnhance',
        props: {
          type: 'tag',
          format: (row: GameGroupConfigLogVo) => changeSourceMap[row.change_source] || '未知',
          color: (row: GameGroupConfigLogVo) => changeSourceColorMap[row.change_source] || 'info',
        },
      },
    },
    {
      label: () => '操作人',
      prop: 'operator',
      width: 120,
    },
    {
      label: () => '操作IP',
      prop: 'operator_ip',
      width: 140,
      cellRenderTo: {
        name: 'nmCellEnhance',
        props: {
          type: 'copyable',
        },
      },
    },
    {
      label: () => 'TG消息ID',
      prop: 'tg_message_id',
      width: 120,
    },
    {
      label: () => '变更参数',
      prop: 'change_params',
      minWidth: 200,
      showOverflowTooltip: true,
      cellRenderTo: {
        name: 'nmCellEnhance',
        props: {
          format: (row: GameGroupConfigLogVo) => {
            if (!row.change_params) return '-'
            try {
              return JSON.stringify(JSON.parse(row.change_params), null, 2)
            }
            catch {
              return row.change_params
            }
          },
        },
      },
    },
    {
      label: () => t('gameGroupConfigLog.created_at'),
      prop: 'created_at',
      width: 180,
    },
  ]
}
