/**
 * 群组配置表单项配置
 */
import type { MaFormItem } from '@mineadmin/form'
import type { GameGroupConfigVo } from '~/game/api/GameGroupConfig.ts'

export default function getFormItems(
  formType: 'add' | 'edit',
  t: any,
  model: GameGroupConfigVo
): MaFormItem[] {
  return [
    {
      label: () => t('gameGroupConfig.tenant_id'),
      prop: 'tenant_id',
      render: () => <el-input v-model={model.tenant_id} placeholder={t('gameGroupConfig.tenant_id')} clearable />,
      itemProps: {
        required: true,
      },
    },
    {
      label: () => t('gameGroupConfig.tg_chat_id'),
      prop: 'tg_chat_id',
      render: () => <el-input-number v-model={model.tg_chat_id} controls={false} style="width: 100%" />,
      itemProps: {
        required: true,
      },
    },
    {
      label: () => t('gameGroupConfig.tg_chat_title'),
      prop: 'tg_chat_title',
      render: () => <el-input v-model={model.tg_chat_title} placeholder={t('gameGroupConfig.tg_chat_title')} clearable />,
      itemProps: {
        required: true,
      },
    },
    {
      label: () => t('gameGroupConfig.wallet_address'),
      prop: 'wallet_address',
      render: () => <el-input v-model={model.wallet_address} placeholder={t('gameGroupConfig.wallet_address')} clearable />,
      itemProps: {
        required: true,
      },
    },
    {
      label: () => t('gameGroupConfig.hot_wallet_address'),
      prop: 'hot_wallet_address',
      render: () => <el-input v-model={model.hot_wallet_address} placeholder={t('gameGroupConfig.hot_wallet_address')} clearable />,
    },
    {
      label: () => t('gameGroupConfig.bet_amount'),
      prop: 'bet_amount',
      render: () => <el-input-number v-model={model.bet_amount} min={0} step={1} precision={2} />,
      itemProps: {
        required: true,
      },
    },
    {
      label: () => t('gameGroupConfig.platform_fee_rate'),
      prop: 'platform_fee_rate',
      render: () => <el-input-number v-model={model.platform_fee_rate} min={0} max={1} step={0.01} precision={4} />,
      itemProps: {
        required: true,
      },
      renderTip: '请输入0-1之间的小数，例如0.1代表10%',
    },
    {
      label: () => t('gameGroupConfig.telegram_admin_whitelist'),
      prop: 'telegram_admin_whitelist',
      render: () => <el-input v-model={model.telegram_admin_whitelist} type="textarea" rows={3} placeholder="请输入Telegram管理员ID，多个用逗号分隔" />,
      renderTip: '多个管理员ID用逗号分隔，例如：123456,789012',
    },
    {
      label: () => t('gameGroupConfig.status'),
      prop: 'status',
      render: () => (
        <el-radio-group v-model={model.status}>
          <el-radio label={1}>正常</el-radio>
          <el-radio label={2}>停用</el-radio>
        </el-radio-group>
      ),
      itemProps: {
        required: true,
      },
    },
  ]
}
