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
 * 群组配置表单项配置
 */
import type { MaFormItem } from '@mineadmin/form'
import type { GameGroupConfigVo } from '~/game/api/GameGroupConfig.ts'

export default function getFormItems(
  formType: 'add' | 'edit',
  t: any,
  model: Partial<GameGroupConfigVo>
): MaFormItem[] {
  // 新增默认值
  if (formType === 'add') {
    model.status = 1
    model.bet_amount = 5
    model.platform_fee_rate = 0.1
  }

  return [
    {
      label: t('gameGroupConfig.tenant_id'),
      prop: 'tenant_id',
      render: () => <el-input placeholder={t('gameGroupConfig.tenant_id')} clearable />,
      itemProps: {
        required: true,
      },
    },
    {
      label: t('gameGroupConfig.tg_chat_id'),
      prop: 'tg_chat_id',
      render: () => <el-input-number controls={false} style="width: 100%" placeholder={t('gameGroupConfig.tg_chat_id')} />,
      itemProps: {
        required: true,
      },
    },
    {
      label: t('gameGroupConfig.tg_chat_title'),
      prop: 'tg_chat_title',
      render: () => <el-input placeholder={t('gameGroupConfig.tg_chat_title')} clearable />,
      itemProps: {
        required: true,
      },
    },
    {
      label: t('gameGroupConfig.wallet_address'),
      prop: 'wallet_address',
      render: () => <el-input placeholder={t('gameGroupConfig.wallet_address')} clearable />,
      itemProps: {
        required: true,
      },
    },
    {
      label: t('gameGroupConfig.hot_wallet_address'),
      prop: 'hot_wallet_address',
      render: () => <el-input placeholder={t('gameGroupConfig.hot_wallet_address')} clearable />,
    },
    {
      label: t('gameGroupConfig.bet_amount'),
      prop: 'bet_amount',
      render: () => <el-input-number min={0} step={1} precision={2} placeholder={t('gameGroupConfig.bet_amount')} />,
      itemProps: {
        required: true,
      },
    },
    {
      label: t('gameGroupConfig.platform_fee_rate'),
      prop: 'platform_fee_rate',
      render: () => <el-input-number min={0} max={1} step={0.01} precision={4} placeholder="请输入0-1之间的小数，例如0.1代表10%" />,
      itemProps: {
        required: true,
      },
    },
    {
      label: t('gameGroupConfig.telegram_admin_whitelist'),
      prop: 'telegram_admin_whitelist',
      render: () => <el-input type="textarea" rows={3} placeholder="请输入Telegram管理员ID，多个用逗号分隔" />,
    },
    {
      label: t('gameGroupConfig.status'),
      prop: 'status',
      render: () => (
        <el-radio-group>
          <el-radio label={1}>{t('gameGroupConfig.status_normal')}</el-radio>
          <el-radio label={2}>{t('gameGroupConfig.status_disabled')}</el-radio>
        </el-radio-group>
      ),
      itemProps: {
        required: true,
      },
    },
  ]
}
