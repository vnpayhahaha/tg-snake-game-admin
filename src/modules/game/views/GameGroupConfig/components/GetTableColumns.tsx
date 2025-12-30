/**
 * 群组配置表格列配置
 */
import type { MaProTableColumns, MaProTableExpose } from '@mineadmin/pro-table'
import type { GameGroupConfigVo } from '~/game/api/GameGroupConfig.ts'
import type { UseDialogExpose } from '@/hooks/useDialog.ts'

import { useMessage } from '@/hooks/useMessage.ts'
import { deleteByIds, cancelWalletChange, completeWalletChange } from '~/game/api/GameGroupConfig.ts'
import { ResultCode } from '@/utils/ResultCode.ts'
import hasAuth from '@/utils/permission/hasAuth.ts'
import { selectStatus } from '@/modules/Common'

export default function getTableColumns(
  dialog: UseDialogExpose,
  walletChangeDialog: UseDialogExpose,
  t: any
): MaProTableColumns[] {
  const msg = useMessage()

  const showBtn = (auth: string | string[], row: GameGroupConfigVo) => {
    return hasAuth(auth)
  }

  return [
    // 多选列
    {
      type: 'selection',
      showOverflowTooltip: false,
      label: () => t('crud.selection'),
    },
    // 索引序号列
    { type: 'index', hide: true },
    // 租户ID
    {
      label: () => t('gameGroupConfig.tenant_id'),
      prop: 'tenant_id',
      width: '120px',
    },
    // Telegram群组ID
    {
      label: () => t('gameGroupConfig.tg_chat_id'),
      prop: 'tg_chat_id',
      width: '150px',
    },
    // 群组标题
    {
      label: () => t('gameGroupConfig.tg_chat_title'),
      prop: 'tg_chat_title',
      width: '200px',
      showOverflowTooltip: true,
    },
    // 钱包地址
    {
      label: () => t('gameGroupConfig.wallet_address'),
      prop: 'wallet_address',
      width: '280px',
      showOverflowTooltip: true,
    },
    // 投注金额
    {
      label: () => t('gameGroupConfig.bet_amount'),
      prop: 'bet_amount',
      width: '160px',
      cellRender:({row}) => `${row.bet_amount} TRX`,
    },
    // 平台手续费比例
    {
      label: () => t('gameGroupConfig.platform_fee_rate'),
      prop: 'platform_fee_rate',
      width: '130px',
      cellRender:({row}) => `${(row.platform_fee_rate * 100).toFixed(2)}%`,
    },
    // 钱包变更状态
    {
      label: () => t('gameGroupConfig.wallet_change_status'),
      prop: 'wallet_change_status',
      width: '120px',
      cellRenderTo: {
            name: 'nmCellEnhance',
            props: {
              type: 'tag',
              api: () => new Promise(resolve => resolve(selectStatus('tg_game_group_config', 'wallet_change_status_list'))),
              dataHandle: (response: any) => {
                return response.data?.map((item: Common.StatusOptionItem) => {
                  return { label: `${item.label}`, value: item.value }
                })
              },
              props: {
                effect: 'dark',
              },
            },
          },
    },
    // 钱包周期
    {
      label: () => t('gameGroupConfig.wallet_change_count'),
      prop: 'wallet_change_count',
      width: '100px',
    },
    // 状态
    {
      label: () => t('gameGroupConfig.status'),
      prop: 'status',
      width: '100px',
      cellRenderTo: {
          name: 'nmCellEnhance',
          props: {
            type: 'tag',
            api: () => new Promise(resolve => resolve(selectStatus('tg_game_group_config', 'status_list'))),
            dataHandle: (response: any) => {
              return response.data?.map((item: Common.StatusOptionItem) => {
                return { label: `${item.label}`, value: item.value }
              })
            },
            props: {
              effect: 'dark',
            },
          },
        },
    },
    // 创建时间
    {
      label: () => t('gameGroupConfig.created_at'),
      prop: 'created_at',
      width: '180px',
    },
    // 操作列
    {
      type: 'operation',
      label: () => t('crud.operation'),
      width: '180px',
      fixed: 'left',
      operationConfigure: {
        type: 'tile',
        actions: [
          {
            name: 'edit',
            show: ({ row }) => showBtn('tg_game:config:update', row),
            text: () => t('crud.edit'),
            onClick: ({ row }) => {
              dialog.setTitle(t('crud.edit'))
              dialog.open({ formType: 'edit', data: row })
            },
          },
          {
            name: 'walletChange',
            show: ({ row }) => showBtn('tg_game:config:startWalletChange', row) && row.wallet_change_status === 1,
            text: () => t('gameGroupConfig.startWalletChange'),
            onClick: ({ row }) => {
              walletChangeDialog.setTitle(t('gameGroupConfig.startWalletChange'))
              walletChangeDialog.open({ formType: 'walletChange', data: row })
            },
          },
          {
            name: 'cancelWalletChange',
            show: ({ row }) => showBtn('tg_game:config:cancelWalletChange', row) && row.wallet_change_status === 2,
            text: () => t('gameGroupConfig.cancelWalletChange'),
            onClick: async ({ row }, proxy: MaProTableExpose) => {
              msg.confirm(t('gameGroupConfig.walletChangeCancelConfirm')).then(async () => {
                const res = await cancelWalletChange(row.id)
                if (res.code === ResultCode.SUCCESS) {
                  msg.success(t('crud.success'))
                  proxy.refresh()
                }
              })
            },
          },
          {
            name: 'completeWalletChange',
            show: ({ row }) => showBtn('tg_game:config:completeWalletChange', row) && row.wallet_change_status === 2,
            text: () => t('gameGroupConfig.completeWalletChange'),
            onClick: async ({ row }, proxy: MaProTableExpose) => {
              msg.confirm(t('gameGroupConfig.walletChangeConfirm')).then(async () => {
                const res = await completeWalletChange(row.id)
                if (res.code === ResultCode.SUCCESS) {
                  msg.success(t('crud.success'))
                  proxy.refresh()
                }
              })
            },
          },
        ],
      },
    },
  ]
}
