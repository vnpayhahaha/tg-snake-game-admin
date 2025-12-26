/**
 * Telegram命令消息表格列配置
 */
import type { MaProTableColumns, MaProTableExpose } from '@mineadmin/pro-table'
import type { TelegramCommandMessageVo } from '~/game/api/TelegramCommandMessage.ts'
import type { UseDialogExpose } from '@/hooks/useDialog.ts'
import hasAuth from '@/utils/permission/hasAuth.ts'
import { deleteByIds, realDelete } from '~/game/api/TelegramCommandMessage.ts'
import { useMessage } from '@/hooks/useMessage.ts'
import { ResultCode } from '@/utils/ResultCode.ts'

export default function getTableColumns(
  dialog: UseDialogExpose,
  t: any,
  proTableRef: any
): MaProTableColumns {
  const msg = useMessage()

  // 检查是否显示按钮
  const showBtn = (auth: string | string[], row?: TelegramCommandMessageVo) => {
    if (Array.isArray(auth)) {
      return auth.some(item => hasAuth(item))
    }
    return hasAuth(auth)
  }

  // 查看详情
  const handleViewDetail = (row: TelegramCommandMessageVo) => {
    dialog.setTitle(t('telegramCommandMessage.viewDetail'))
    dialog.open({ formType: 'viewDetail', data: row })
  }

  // 删除记录（软删除）
  const handleDelete = (row: TelegramCommandMessageVo) => {
    msg.delConfirm(t('crud.delMessage')).then(async () => {
      const response = await deleteByIds([row.id])
      if (response.code === ResultCode.SUCCESS) {
        msg.success(t('crud.delSuccess'))
        proTableRef.value?.refresh()
      }
      else {
        msg.error(response.message)
      }
    })
  }

  // 真实删除
  const handleRealDelete = (row: TelegramCommandMessageVo) => {
    msg.delConfirm(t('telegramCommandMessage.realDeleteConfirm')).then(async () => {
      const response = await realDelete([row.id])
      if (response.code === ResultCode.SUCCESS) {
        msg.success(t('crud.delSuccess'))
        proTableRef.value?.refresh()
      }
      else {
        msg.error(response.message)
      }
    })
  }

  return [
    // { type: 'selection', showOverflowTooltip: false, label: () => t('crud.selection') },
    // { type: 'index', label: () => t('crud.index'), width: 70 },
    {
      label: () => t('telegramCommandMessage.id'),
      prop: 'id',
      width: 80,
    },
    {
      label: () => t('telegramCommandMessage.group_id'),
      prop: 'group_id',
      width: 100,
    },
    {
      label: () => t('telegramCommandMessage.group_name'),
      prop: 'group_name',
      width: 150,
      showOverflowTooltip: true,
    },
    {
      label: () => t('telegramCommandMessage.tg_chat_id'),
      prop: 'tg_chat_id',
      width: 130,
    },
    {
      label: () => t('telegramCommandMessage.tg_user_id'),
      prop: 'tg_user_id',
      width: 120,
    },
    {
      label: () => t('telegramCommandMessage.tg_username'),
      prop: 'tg_username',
      width: 150,
    },
    {
      label: () => t('telegramCommandMessage.command'),
      prop: 'command',
      width: 120,
      cellRenderTo: {
        name: 'nmCellEnhance',
        props: {
          type: 'tag',
          color: 'primary',
        },
      },
    },
    {
      label: () => t('telegramCommandMessage.message_text'),
      prop: 'message_text',
      minWidth: 200,
      showOverflowTooltip: true,
    },
    {
      label: () => t('telegramCommandMessage.response_text'),
      prop: 'response_text',
      minWidth: 200,
      showOverflowTooltip: true,
    },
    {
      label: () => t('telegramCommandMessage.is_success'),
      prop: 'is_success',
      width: 100,
      cellRenderTo: {
        name: 'nmCellEnhance',
        props: {
          type: 'tag',
          format: (row: TelegramCommandMessageVo) => row.is_success === 1 ? t('telegramCommandMessage.success') : t('telegramCommandMessage.failed'),
          color: (row: TelegramCommandMessageVo) => row.is_success === 1 ? 'success' : 'danger',
        },
      },
    },
    {
      label: () => t('telegramCommandMessage.error_message'),
      prop: 'error_message',
      minWidth: 200,
      showOverflowTooltip: true,
    },
    {
      label: () => t('telegramCommandMessage.created_at'),
      prop: 'created_at',
      width: 180,
    },
    {
      label: () => t('crud.operation'),
      fixed: 'right',
      type: 'operation',
      showOverflowTooltip: false,
      operationConfigure: {
        actions: [
          {
            name: 'viewDetail',
            show: () => showBtn('tg_game:command_message:view'),
            text: () => t('crud.view'),
            onClick: ({ row }: any) => handleViewDetail(row),
            actionType: 'primary',
          },
          {
            name: 'delete',
            show: () => showBtn('tg_game:command_message:delete'),
            text: () => t('crud.delete'),
            onClick: ({ row }: any) => handleDelete(row),
            actionType: 'danger',
          },
        ],
        moreActions: [
          {
            name: 'realDelete',
            show: () => showBtn('tg_game:command_message:realDelete'),
            text: () => t('telegramCommandMessage.realDelete'),
            onClick: ({ row }: any) => handleRealDelete(row),
          },
        ],
      },
    },
  ]
}
