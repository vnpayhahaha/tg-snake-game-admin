/**
 * 群组配置搜索项配置
 */
import type { MaSearchItem } from '@mineadmin/search'

export default function getSearchItems(t: any): MaSearchItem[] {
  return [
    {
      label: () => t('gameGroupConfig.tenant_id'),
      prop: 'tenant_id',
      render: () => <el-input placeholder={t('gameGroupConfig.tenant_id')} clearable />,
      renderProps: {
        placeholder: () => t('gameGroupConfig.tenant_id'),
      },
    },
    {
      label: () => t('gameGroupConfig.tg_chat_id'),
      prop: 'tg_chat_id',
      render: () => <el-input placeholder={t('gameGroupConfig.tg_chat_id')} clearable />,
      renderProps: {
        placeholder: () => t('gameGroupConfig.tg_chat_id'),
      },
    },
    {
      label: () => t('gameGroupConfig.status'),
      prop: 'status',
      render: () => (
        <el-select placeholder={t('gameGroupConfig.status')} clearable>
          <el-option label="正常" value={1} />
          <el-option label="停用" value={2} />
        </el-select>
      ),
    },
  ]
}
