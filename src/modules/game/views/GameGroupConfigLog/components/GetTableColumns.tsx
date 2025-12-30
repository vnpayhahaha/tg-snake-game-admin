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
import { selectStatus } from '@/modules/Common'
import type { MaProTableColumns } from '@mineadmin/pro-table'
import { hi } from 'element-plus/es/locale/index.mjs'

// 格式化JSON显示
const formatJson = (jsonString: string) => {
  if (!jsonString) return '-'
  try {
    const parsed = typeof jsonString === 'string' ? JSON.parse(jsonString) : jsonString
    return JSON.stringify(parsed, null, 2)
  } catch {
    return jsonString
  }
}

export default function getTableColumns(
  t: any
): MaProTableColumns {
  return [
    {
      label: () => 'ID',
      prop: 'id',
      width: 80,
      hide: true,
    },
    // 展开行
    {
      label: () => t('gameGroupConfigLog.change_params'),
      prop: 'change_params',
      type: 'expand',
      width: 100,
      cellRender: ({ row }) => {
        return (
          <div style={{ padding: '20px' }}>
            <div class="expand-section">
              <h4 style={{ margin: '0 0 12px 0', color: '#409eff', borderBottom: '1px solid #e4e7ed', paddingBottom: '8px' }}>
                {t('gameGroupConfigLog.change_params')}
              </h4>
              <el-input
                type="textarea"
                readonly
                rows={10}
                value={formatJson(row.change_params)}
                style={{ marginBottom: '16px' }}
              />
            </div>
          </div>
        )
      }
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
    },
    {
      label: () => t('gameGroupConfigLog.source'),
      prop: 'change_source',
      width: 120,
      cellRenderTo: {
          name: 'nmCellEnhance',
          props: {
            type: 'tag',
            api: () => new Promise(resolve => resolve(selectStatus('tg_game_group_config_log', 'change_source_list'))),
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
      label: () => t('gameGroupConfigLog.operator'),
      prop: 'operator',
      width: 120,
    },
    {
      label: () => t('gameGroupConfigLog.operator_ip'),
      prop: 'operator_ip',
      minWidth: 140,
    },
    {
      label: () => t('gameGroupConfigLog.tg_message_id'),
      prop: 'tg_message_id',
      width: 120,
    },
    {
      label: () => t('gameGroupConfigLog.created_at'),
      prop: 'created_at',
      width: 180,
    },
  ]
}
