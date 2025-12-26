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
 * 钱包绑定日志搜索项配置
 */
import type { MaProTableSearchItem } from '@mineadmin/pro-table'

export default function getSearchItems(t: any): MaProTableSearchItem[] {
  return [
    {
      label: () => t('playerWalletBindingLog.group_id'),
      prop: 'group_id',
      render: () => <el-input-number placeholder={t('playerWalletBindingLog.group_id')} controls={false} style="width: 100%" />,
    },
    {
      label: () => t('playerWalletBindingLog.tg_user_id'),
      prop: 'tg_user_id',
      render: () => <el-input placeholder={t('playerWalletBindingLog.tg_user_id')} clearable />,
    },
    {
      label: () => t('playerWalletBindingLog.tg_username'),
      prop: 'tg_username',
      render: () => <el-input placeholder={t('playerWalletBindingLog.tg_username')} clearable />,
    },
    {
      label: () => t('playerWalletBindingLog.action'),
      prop: 'change_type',
      render: () => (
        <el-select placeholder={t('playerWalletBindingLog.action')} clearable>
          <el-option label={t('playerWalletBindingLog.actionBind')} value={1} />
          <el-option label={t('playerWalletBindingLog.actionUpdate')} value={2} />
        </el-select>
      ),
    },
    {
      label: () => t('playerWalletBindingLog.created_at'),
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
