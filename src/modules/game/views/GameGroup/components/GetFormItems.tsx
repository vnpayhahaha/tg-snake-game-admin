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
 * 游戏群组表单项配置
 */
import type { MaFormItem } from '@mineadmin/form'
import type { GameGroupVo } from '~/game/api/GameGroup.ts'

export default function getFormItems(
  formType: 'add' | 'edit',
  t: any,
  model: Partial<GameGroupVo>
): MaFormItem[] {
  // 新增默认值
  if (formType === 'add') {
    model.status = 1
  }

  return [
    {
      label: t('gameGroup.config_id'),
      prop: 'config_id',
      render: () => <el-input-number min={1} placeholder={t('gameGroup.config_id')} />,
      itemProps: {
        required: true,
      },
    },
    {
      label: t('gameGroup.group_name'),
      prop: 'group_name',
      render: () => <el-input placeholder={t('gameGroup.group_name')} clearable />,
      itemProps: {
        required: true,
      },
    },
    {
      label: t('gameGroup.status'),
      prop: 'status',
      render: () => (
        <el-radio-group>
          <el-radio label={1}>{t('gameGroup.status_normal')}</el-radio>
          <el-radio label={2}>{t('gameGroup.status_disabled')}</el-radio>
        </el-radio-group>
      ),
      itemProps: {
        required: true,
      },
    },
  ]
}
