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
 * 钱包变更表单项配置
 */
import type { MaFormItem } from '@mineadmin/form'

export interface WalletChangeFormVo {
  new_wallet_address: string
  cooldown_minutes: number
}

export default function getWalletChangeFormItems(
  t: any
): MaFormItem[] {
  return [
    {
      label: t('gameGroupConfig.new_wallet_address'),
      prop: 'new_wallet_address',
      render: () => <el-input placeholder="TRON钱包地址以T开头，34位字符" clearable />,
      itemProps: {
        required: true,
      },
    },
    {
      label: t('gameGroupConfig.cooldown_minutes'),
      prop: 'cooldown_minutes',
      render: () => <el-input-number min={1} max={1440} placeholder="冷却时间（分钟），建议10-60分钟" />,
      itemProps: {
        required: true,
      },
    },
  ]
}
