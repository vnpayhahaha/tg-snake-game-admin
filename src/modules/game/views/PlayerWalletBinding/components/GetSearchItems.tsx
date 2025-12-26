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
 * 玩家钱包绑定搜索项配置
 */
import type { MaProTableSearchItem } from '@mineadmin/pro-table'

export default function getSearchItems(t: any): MaProTableSearchItem[] {
  return [
    {
      label: () => t('playerWalletBinding.group_id'),
      prop: 'group_id',
      render: () => <el-input-number placeholder={t('playerWalletBinding.group_id')} controls={false} style="width: 100%" />,
    },
    {
      label: () => t('playerWalletBinding.tg_user_id'),
      prop: 'tg_user_id',
      render: () => <el-input placeholder={t('playerWalletBinding.tg_user_id')} clearable />,
    },
    {
      label: () => t('playerWalletBinding.tg_username'),
      prop: 'tg_username',
      render: () => <el-input placeholder={t('playerWalletBinding.tg_username')} clearable />,
    },
    {
      label: () => t('playerWalletBinding.wallet_address'),
      prop: 'wallet_address',
      render: () => <el-input placeholder={t('playerWalletBinding.wallet_address')} clearable />,
    },
    {
      label: () => t('playerWalletBinding.created_at'),
      prop: 'created_at',
      render: () => (
        <el-date-picker
          type="daterange"
          range-separator="-"
          start-placeholder={t('crud.startDate')}
          end-placeholder={t('crud.endDate')}
          value-format="YYYY-MM-DD"
          style="width: 100%"
        />
      ),
    },
  ]
}
