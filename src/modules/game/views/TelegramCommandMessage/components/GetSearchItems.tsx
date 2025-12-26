/**
 * Telegram命令消息搜索项配置
 */
import type { MaProTableSearchItem } from '@mineadmin/pro-table'

export default function getSearchItems(t: any): MaProTableSearchItem[] {
  return [
    {
      label: () => t('telegramCommandMessage.group_id'),
      prop: 'group_id',
      render: () => <el-input-number placeholder={t('telegramCommandMessage.group_id')} controls={false} style="width: 100%" />,
    },
    {
      label: () => t('telegramCommandMessage.tg_chat_id'),
      prop: 'tg_chat_id',
      render: () => <el-input-number placeholder={t('telegramCommandMessage.tg_chat_id')} controls={false} style="width: 100%" />,
    },
    {
      label: () => t('telegramCommandMessage.tg_user_id'),
      prop: 'tg_user_id',
      render: () => <el-input-number placeholder={t('telegramCommandMessage.tg_user_id')} controls={false} style="width: 100%" />,
    },
    {
      label: () => t('telegramCommandMessage.tg_username'),
      prop: 'tg_username',
      render: () => <el-input placeholder={t('telegramCommandMessage.tg_username')} clearable />,
    },
    {
      label: () => t('telegramCommandMessage.command'),
      prop: 'command',
      render: () => (
        <el-select placeholder={t('telegramCommandMessage.command')} clearable>
          <el-option label="/start" value="/start" />
          <el-option label="/help" value="/help" />
          <el-option label="/buy" value="/buy" />
          <el-option label="/wallet" value="/wallet" />
          <el-option label="/balance" value="/balance" />
          <el-option label="/snake" value="/snake" />
          <el-option label="/prize" value="/prize" />
          <el-option label="/stats" value="/stats" />
          <el-option label="/bind" value="/bind" />
          <el-option label="/unbind" value="/unbind" />
        </el-select>
      ),
    },
    {
      label: () => t('telegramCommandMessage.is_success'),
      prop: 'is_success',
      render: () => (
        <el-select placeholder={t('telegramCommandMessage.is_success')} clearable>
          <el-option label={t('telegramCommandMessage.success')} value={1} />
          <el-option label={t('telegramCommandMessage.failed')} value={0} />
        </el-select>
      ),
    },
    {
      label: () => t('telegramCommandMessage.created_at'),
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
