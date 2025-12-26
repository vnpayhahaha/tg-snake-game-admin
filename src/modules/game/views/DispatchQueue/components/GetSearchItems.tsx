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
 * 派奖队列搜索项配置
 */
import type { MaProTableSearchItem } from '@mineadmin/pro-table'

export default function getSearchItems(t: any): MaProTableSearchItem[] {
  return [
    {
      label: () => t('dispatchQueue.prize_record_id'),
      prop: 'prize_record_id',
      render: () => <el-input-number placeholder={t('dispatchQueue.prize_record_id')} controls={false} style="width: 100%" />,
    },
    {
      label: () => t('dispatchQueue.group_id'),
      prop: 'group_id',
      render: () => <el-input-number placeholder={t('dispatchQueue.group_id')} controls={false} style="width: 100%" />,
    },
    {
      label: () => t('dispatchQueue.prize_serial_no'),
      prop: 'prize_serial_no',
      render: () => <el-input placeholder={t('dispatchQueue.prize_serial_no')} clearable />,
    },
    {
      label: () => t('dispatchQueue.status'),
      prop: 'status',
      render: () => (
        <el-select placeholder={t('dispatchQueue.status')} clearable>
          <el-option label={t('dispatchQueue.statusPending')} value={1} />
          <el-option label={t('dispatchQueue.statusProcessing')} value={2} />
          <el-option label={t('dispatchQueue.statusCompleted')} value={3} />
          <el-option label={t('dispatchQueue.statusFailed')} value={4} />
          <el-option label="已取消" value={5} />
        </el-select>
      ),
    },
    {
      label: () => t('dispatchQueue.created_at'),
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
