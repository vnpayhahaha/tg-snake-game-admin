/**
 * 钱包变更表单项配置
 */
import type { MaFormItem } from '@mineadmin/form'

export interface WalletChangeFormVo {
  new_wallet_address: string
  cooldown_minutes: number
}

export default function getWalletChangeFormItems(
  t: any,
  model: WalletChangeFormVo
): MaFormItem[] {
  return [
    {
      label: () => t('gameGroupConfig.new_wallet_address'),
      prop: 'new_wallet_address',
      render: () => <el-input v-model={model.new_wallet_address} placeholder="请输入新的TRON钱包地址" clearable />,
      itemProps: {
        required: true,
      },
      renderTip: 'TRON钱包地址以T开头，34位字符',
    },
    {
      label: () => t('gameGroupConfig.cooldown_minutes'),
      prop: 'cooldown_minutes',
      render: () => <el-input-number v-model={model.cooldown_minutes} min={1} max={1440} />,
      itemProps: {
        required: true,
      },
      renderTip: '冷却时间（分钟），建议10-60分钟',
    },
  ]
}
