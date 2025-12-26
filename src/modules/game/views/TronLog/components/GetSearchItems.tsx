/**
 * TRON交易日志搜索项配置
 */
import type { MaProTableSearchItem } from '@mineadmin/pro-table'

export default function getSearchItems(t: any): MaProTableSearchItem[] {
  return [
    {
      label: () => t('tronLog.group_id'),
      prop: 'group_id',
      render: () => <el-input-number placeholder={t('tronLog.group_id')} controls={false} style="width: 100%" />,
    },
    {
      label: () => t('tronLog.tx_hash'),
      prop: 'tx_hash',
      render: () => <el-input placeholder={t('tronLog.tx_hash')} clearable />,
    },
    {
      label: () => t('tronLog.from_address'),
      prop: 'from_address',
      render: () => <el-input placeholder={t('tronLog.from_address')} clearable />,
    },
    {
      label: () => t('tronLog.to_address'),
      prop: 'to_address',
      render: () => <el-input placeholder={t('tronLog.to_address')} clearable />,
    },
    {
      label: () => t('tronLog.status'),
      prop: 'status',
      render: () => (
        <el-select placeholder={t('tronLog.status')} clearable>
          <el-option label="SUCCESS" value="SUCCESS" />
          <el-option label="FAILED" value="FAILED" />
        </el-select>
      ),
    },
    {
      label: () => t('tronLog.is_valid'),
      prop: 'is_valid',
      render: () => (
        <el-select placeholder={t('tronLog.is_valid')} clearable>
          <el-option label={t('tronLog.valid')} value={true} />
          <el-option label={t('tronLog.invalid')} value={false} />
        </el-select>
      ),
    },
    {
      label: () => t('tronLog.processed'),
      prop: 'processed',
      render: () => (
        <el-select placeholder={t('tronLog.processed')} clearable>
          <el-option label={t('tronLog.processed_yes')} value={true} />
          <el-option label={t('tronLog.processed_no')} value={false} />
        </el-select>
      ),
    },
    {
      label: () => t('tronLog.created_at'),
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
