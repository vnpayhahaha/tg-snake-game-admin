/**
 * 中奖记录搜索项配置
 */
import type { MaProTableSearchItem } from '@mineadmin/pro-table'

export default function getSearchItems(t: any): MaProTableSearchItem[] {
  return [
    {
      label: () => t('prizeRecord.group_id'),
      prop: 'group_id',
      render: () => <el-input-number placeholder={t('prizeRecord.group_id')} controls={false} style="width: 100%" />,
    },
    {
      label: () => t('prizeRecord.prize_serial_no'),
      prop: 'prize_serial_no',
      render: () => <el-input placeholder={t('prizeRecord.prize_serial_no')} clearable />,
    },
    {
      label: () => t('prizeRecord.wallet_cycle'),
      prop: 'wallet_cycle',
      render: () => <el-input-number placeholder={t('prizeRecord.wallet_cycle')} controls={false} style="width: 100%" />,
    },
    {
      label: () => t('prizeRecord.ticket_number'),
      prop: 'ticket_number',
      render: () => <el-input placeholder={t('prizeRecord.ticket_number')} clearable />,
    },
    {
      label: () => t('prizeRecord.status'),
      prop: 'status',
      render: () => (
        <el-select placeholder={t('prizeRecord.status')} clearable>
          <el-option label={t('prizeRecord.status_pending')} value={1} />
          <el-option label={t('prizeRecord.status_processing')} value={2} />
          <el-option label={t('prizeRecord.status_completed')} value={3} />
          <el-option label={t('prizeRecord.status_failed')} value={4} />
          <el-option label={t('prizeRecord.status_partial_failed')} value={5} />
        </el-select>
      ),
    },
    {
      label: () => t('prizeRecord.created_at'),
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
