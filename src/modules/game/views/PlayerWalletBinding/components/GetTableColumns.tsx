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
 * 玩家钱包绑定表格列配置
 */
import type { MaProTableColumns } from '@mineadmin/pro-table'
import type { PlayerWalletBindingVo } from '~/game/api/PlayerWalletBinding.ts'
import hasAuth from '@/utils/permission/hasAuth.ts'
import { unbind, deleteByIds } from '~/game/api/PlayerWalletBinding.ts'
import { useMessage } from '@/hooks/useMessage.ts'
import { ResultCode } from '@/utils/ResultCode.ts'

export default function getTableColumns(
  t: any,
  proTableRef: any
): MaProTableColumns {
  const msg = useMessage()

  const showBtn = (auth: string | string[]) => {
    if (Array.isArray(auth)) {
      return auth.some(item => hasAuth(item))
    }
    return hasAuth(auth)
  }

  // 解除绑定
  const handleUnbind = (row: PlayerWalletBindingVo) => {
    msg.confirm(t('playerWalletBinding.unbindConfirm')).then(async () => {
      const response = await unbind(row.id)
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
  const handleDelete = (row: PlayerWalletBindingVo) => {
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
      label: () => t('playerWalletBinding.group_id'),
      prop: 'group_id',
      width: 100,
    },
    {
      label: () => t('playerWalletBinding.tg_user_id'),
      prop: 'tg_user_id',
      width: 150,
    },
    {
      label: () => t('playerWalletBinding.tg_username'),
      prop: 'tg_username',
      width: 150,
    },
    {
      label: () => t('playerWalletBinding.tg_first_name'),
      prop: 'tg_first_name',
      width: 120,
    },
    {
      label: () => t('playerWalletBinding.tg_last_name'),
      prop: 'tg_last_name',
      width: 120,
    },
    {
      label: () => t('playerWalletBinding.wallet_address'),
      prop: 'wallet_address',
      width: 300,
    },
    {
      label: () => t('playerWalletBinding.bind_at'),
      prop: 'bind_at',
      width: 180,
    },
    {
      label: () => t('playerWalletBinding.created_at'),
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
            name: 'unbind',
            show: () => showBtn('tg_game:wallet_binding:unbind'),
            text: () => t('playerWalletBinding.unbind'),
            onClick: ({ row }: any) => handleUnbind(row),
            actionType: 'warning',
          },
        ],
      },
    },
  ]
}
