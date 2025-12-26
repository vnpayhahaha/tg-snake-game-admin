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
 * 配置变更日志搜索项配置
 */
import type { MaProTableSearchItem } from '@mineadmin/pro-table'

export default function getSearchItems(t: any): MaProTableSearchItem[] {
  return [
    {
      label: () => t('gameGroupConfigLog.config_id'),
      prop: 'config_id',
      render: () => <el-input-number placeholder={t('gameGroupConfigLog.config_id')} controls={false} style="width: 100%" />,
    },
    {
      label: () => 'Telegram群组ID',
      prop: 'tg_chat_id',
      render: () => <el-input placeholder="Telegram群组ID" clearable />,
    },
    {
      label: () => t('gameGroupConfigLog.source'),
      prop: 'change_source',
      render: () => (
        <el-select placeholder={t('gameGroupConfigLog.source')} clearable>
          <el-option label={t('gameGroupConfigLog.sourceAdmin')} value={1} />
          <el-option label={t('gameGroupConfigLog.sourceTelegram')} value={2} />
          <el-option label={t('gameGroupConfigLog.sourceSystem')} value={3} />
        </el-select>
      ),
    },
    {
      label: () => '操作人',
      prop: 'operator',
      render: () => <el-input placeholder="操作人" clearable />,
    },
    {
      label: () => t('gameGroupConfigLog.created_at'),
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
