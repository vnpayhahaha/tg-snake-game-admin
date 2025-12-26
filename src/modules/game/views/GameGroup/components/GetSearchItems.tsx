/**
 * 游戏群组搜索项配置
 */
import type { MaSearchItem } from '@mineadmin/search'

export default function getSearchItems(t: any): MaSearchItem[] {
  return [
    {
      label: () => t('gameGroup.config_id'),
      prop: 'config_id',
      render: () => <el-input placeholder={t('gameGroup.config_id')} clearable />,
      renderProps: {
        placeholder: () => t('gameGroup.config_id'),
      },
    },
    {
      label: () => t('gameGroup.tg_chat_id'),
      prop: 'tg_chat_id',
      render: () => <el-input placeholder={t('gameGroup.tg_chat_id')} clearable />,
      renderProps: {
        placeholder: () => t('gameGroup.tg_chat_id'),
      },
    },
  ]
}
