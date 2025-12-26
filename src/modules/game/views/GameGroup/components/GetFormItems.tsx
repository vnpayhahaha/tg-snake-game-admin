/**
 * 游戏群组表单项配置
 */
import type { MaFormItem } from '@mineadmin/form'
import type { GameGroupVo } from '~/game/api/GameGroup.ts'

export default function getFormItems(
  formType: 'add' | 'edit',
  t: any,
  model: GameGroupVo
): MaFormItem[] {
  return [
    {
      label: () => t('gameGroup.config_id'),
      prop: 'config_id',
      render: () => <el-input-number v-model={model.config_id} min={1} />,
      itemProps: {
        required: formType === 'add',
      },
    },
    {
      label: () => t('gameGroup.group_name'),
      prop: 'group_name',
      render: () => <el-input v-model={model.group_name} placeholder={t('gameGroup.group_name')} clearable />,
      itemProps: {
        required: true,
      },
    },
    {
      label: () => t('gameGroup.status'),
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
