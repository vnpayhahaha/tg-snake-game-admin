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
 * 游戏群组搜索项配置
 */
import type { MaSearchItem } from '@mineadmin/search'

export default function getSearchItems(t: any): MaSearchItem[] {
  return [
    {
      label: () => t('gameGroup.config_id'),
      prop: 'config_id',
      render: () => <el-input placeholder={t('gameGroup.config_id')} clearable />,
    },
    {
      label: () => t('gameGroup.tg_chat_id'),
      prop: 'tg_chat_id',
      render: () => <el-input placeholder={t('gameGroup.tg_chat_id')} clearable />,
    },
    {
      label: () => t('gameGroup.group_name'),
      prop: 'group_name',
      render: () => <el-input placeholder={t('gameGroup.group_name')} clearable />,
    },
  ]
}
