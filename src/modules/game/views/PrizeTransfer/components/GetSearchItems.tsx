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
 * 中奖转账搜索项配置
 */
import type { MaSearchItem } from '@mineadmin/search'

export default function getSearchItems(t: any): MaSearchItem[] {
  return [
    {
      label: () => t('prizeTransfer.prize_record_id'),
      prop: 'prize_record_id',
      render: () => <el-input-number placeholder={t('prizeTransfer.prize_record_id')} controls={false} style="width: 100%" />,
    },
    {
      label: () => t('prizeTransfer.prize_serial_no'),
      prop: 'prize_serial_no',
      render: () => <el-input placeholder={t('prizeTransfer.prize_serial_no')} clearable />,
    },
    {
      label: () => t('prizeTransfer.node_id'),
      prop: 'node_id',
      render: () => <el-input-number placeholder={t('prizeTransfer.node_id')} controls={false} style="width: 100%" />,
    },
    {
      label: () => t('prizeTransfer.to_address'),
      prop: 'to_address',
      render: () => <el-input placeholder={t('prizeTransfer.to_address')} clearable />,
    },
    {
      label: () => t('prizeTransfer.tx_hash'),
      prop: 'tx_hash',
      render: () => <el-input placeholder={t('prizeTransfer.tx_hash')} clearable />,
    },
    {
      label: () => t('prizeTransfer.status'),
      prop: 'status',
      render: () => (
        <el-select placeholder={t('prizeTransfer.status')} clearable>
          <el-option label={t('prizeTransfer.status_pending')} value={1} />
          <el-option label={t('prizeTransfer.status_processing')} value={2} />
          <el-option label={t('prizeTransfer.status_success')} value={3} />
          <el-option label={t('prizeTransfer.status_failed')} value={4} />
        </el-select>
      ),
    },
    {
      label: () => t('prizeTransfer.created_at'),
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
