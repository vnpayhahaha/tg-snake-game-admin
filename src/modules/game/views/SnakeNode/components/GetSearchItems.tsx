/**
 * 蛇身节点搜索项配置
 */
import type { MaProTableSearchItem } from '@mineadmin/pro-table'

export default function getSearchItems(t: any): MaProTableSearchItem[] {
  return [
    {
      label: () => t('snakeNode.group_id'),
      prop: 'group_id',
      render: () => <el-input-number placeholder={t('snakeNode.group_id')} controls={false} style="width: 100%" />,
    },
    {
      label: () => t('snakeNode.wallet_cycle'),
      prop: 'wallet_cycle',
      render: () => <el-input-number placeholder={t('snakeNode.wallet_cycle')} controls={false} style="width: 100%" />,
    },
    {
      label: () => t('snakeNode.ticket_number'),
      prop: 'ticket_number',
      render: () => <el-input placeholder={t('snakeNode.ticket_number')} clearable />,
    },
    {
      label: () => t('snakeNode.ticket_serial_no'),
      prop: 'ticket_serial_no',
      render: () => <el-input placeholder={t('snakeNode.ticket_serial_no')} clearable />,
    },
    {
      label: () => t('snakeNode.player_address'),
      prop: 'player_address',
      render: () => <el-input placeholder={t('snakeNode.player_address')} clearable />,
    },
    {
      label: () => t('snakeNode.player_tg_username'),
      prop: 'player_tg_username',
      render: () => <el-input placeholder={t('snakeNode.player_tg_username')} clearable />,
    },
    {
      label: () => t('snakeNode.tx_hash'),
      prop: 'tx_hash',
      render: () => <el-input placeholder={t('snakeNode.tx_hash')} clearable />,
    },
    {
      label: () => t('snakeNode.status'),
      prop: 'status',
      render: () => (
        <el-select placeholder={t('snakeNode.status')} clearable>
          <el-option label={t('snakeNode.status_active')} value={1} />
          <el-option label={t('snakeNode.status_matched')} value={2} />
          <el-option label={t('snakeNode.status_unmatched')} value={3} />
        </el-select>
      ),
    },
    {
      label: () => t('snakeNode.created_at'),
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
