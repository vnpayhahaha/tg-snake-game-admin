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
 * 钱包绑定日志表格列配置
 */
import { selectStatus } from '@/modules/Common'
import type { MaProTableColumns } from '@mineadmin/pro-table'
import type { PlayerWalletBindingLogVo } from '~/game/api/PlayerWalletBindingLog.ts'

export default function getTableColumns(t: any): MaProTableColumns {
  // 变更类型映射
  const changeTypeMap: Record<number, string> = {
    1: t('playerWalletBindingLog.actionBind'),
    2: t('playerWalletBindingLog.actionUpdate'),
  }

  // 变更类型颜色映射
  const changeTypeColorMap: Record<number, string> = {
    1: 'success',
    2: 'primary',
  }

  return [
    {
      label: () => 'ID',
      prop: 'id',
      width: 80,
    },
    {
      label: () => t('playerWalletBindingLog.group_id'),
      prop: 'group_id',
      width: 100,
    },
    {
      label: () => t('playerWalletBindingLog.tg_user_id'),
      prop: 'tg_user_id',
      width: 150,
    },
    {
      label: () => t('playerWalletBindingLog.tg_username'),
      prop: 'tg_username',
      width: 150,
    },
    {
      label: () => t('playerWalletBindingLog.action'),
      prop: 'change_type',
      width: 100,
      cellRenderTo: {
            name: 'nmCellEnhance',
             props: {
               type: 'tag',
               api: () => new Promise(resolve => resolve(selectStatus('tg_player_wallet_binding_log', 'change_type_list'))),
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
      label: () => t('playerWalletBindingLog.old_wallet_address'),
      prop: 'old_wallet_address',
      width: 300,
    },
    {
      label: () => t('playerWalletBindingLog.new_wallet_address'),
      prop: 'new_wallet_address',
      width: 300,
    },
    {
      label: () => t('playerWalletBindingLog.created_at'),
      prop: 'created_at',
      width: 180,
    },
  ]
}
