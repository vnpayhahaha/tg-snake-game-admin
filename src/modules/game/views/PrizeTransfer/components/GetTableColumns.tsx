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
 * 中奖转账表格列配置
 */
import type { MaProTableColumns, MaProTableExpose } from '@mineadmin/pro-table'
import type { PrizeTransferVo } from '~/game/api/PrizeTransfer.ts'
import type { UseDialogExpose } from '@/hooks/useDialog.ts'
import hasAuth from '@/utils/permission/hasAuth.ts'
import { deleteByIds, markSuccess, retry } from '~/game/api/PrizeTransfer.ts'
import { useMessage } from '@/hooks/useMessage.ts'
import { ResultCode } from '@/utils/ResultCode.ts'
import { selectStatus } from '@/modules/Common'

export default function getTableColumns(
  dialog: UseDialogExpose,
  t: any,
  proTableRef: any
): MaProTableColumns {
  const msg = useMessage()

  // 检查是否显示按钮
  const showBtn = (auth: string | string[], row?: PrizeTransferVo) => {
    if (Array.isArray(auth)) {
      return auth.some(item => hasAuth(item))
    }
    return hasAuth(auth)
  }

  // 重试转账
  const handleRetry = (row: PrizeTransferVo) => {
    msg.confirm(t('prizeTransfer.retryConfirm')).then(async () => {
      const response = await retry(row.id)
      if (response.code === ResultCode.SUCCESS) {
        msg.success(t('crud.success'))
        proTableRef.value?.refresh()
      }
      else {
        msg.error(response.message)
      }
    })
  }

  // 标记为成功
  const handleMarkSuccess = (row: PrizeTransferVo) => {
    msg.prompt(t('prizeTransfer.markSuccessPrompt'), {
      confirmButtonText: t('crud.confirm'),
      cancelButtonText: t('crud.cancel'),
      inputPlaceholder: t('prizeTransfer.txHashPlaceholder'),
    }).then(async ({ value }: any) => {
      const response = await markSuccess(row.id, { tx_hash: value })
      if (response.code === ResultCode.SUCCESS) {
        msg.success(t('crud.success'))
        proTableRef.value?.refresh()
      }
      else {
        msg.error(response.message)
      }
    }).catch(() => {})
  }

  // 删除记录
  const handleDelete = (row: PrizeTransferVo) => {
    msg.confirm(t('crud.delMessage')).then(async () => {
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

  return [
    // { type: 'selection', showOverflowTooltip: false, label: () => t('crud.selection') },
    // { type: 'index', label: () => t('crud.index'), width: 70 },
    {
      label: () => t('prizeTransfer.id'),
      prop: 'id',
      width: 80,
    },
    {
      label: () => t('prizeTransfer.prize_record_id'),
      prop: 'prize_record_id',
      width: 120,
    },
    {
      label: () => t('prizeTransfer.prize_serial_no'),
      prop: 'prize_serial_no',
      width: 180,
    },
    {
      label: () => t('prizeTransfer.node_id'),
      prop: 'node_id',
      width: 100,
    },
    {
      label: () => t('prizeTransfer.to_address'),
      prop: 'to_address',
      width: 300,
    },
    {
      label: () => t('prizeTransfer.amount'),
      prop: 'amount',
      width: 120,
      cellRenderTo: {
        name: 'nmCellEnhance',
        props: {
          type: 'tag',
          effect: 'dark',
          color: 'success',
          format: (row: PrizeTransferVo) => `${row.amount} TRX`,
        },
      },
    },
    {
      label: () => t('prizeTransfer.tx_hash'),
      prop: 'tx_hash',
      width: 300,
    },
    {
      label: () => t('prizeTransfer.status'),
      prop: 'status',
      width: 100,
      cellRenderTo: {
        name: 'nmCellEnhance',
        props: {
          type: 'tag',
          api: () => new Promise(resolve => resolve(selectStatus('tg_prize_transfer', 'status_list'))),
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
    {
      label: () => t('prizeTransfer.retry_count'),
      prop: 'retry_count',
      width: 100,
      cellRenderTo: {
        name: 'nmCellEnhance',
        props: {
          type: 'tag',
          effect: 'plain',
          color: (row: PrizeTransferVo) => row.retry_count > 3 ? 'danger' : row.retry_count > 0 ? 'warning' : 'info',
        },
      },
    },
    {
      label: () => t('prizeTransfer.error_message'),
      prop: 'error_message',
      minWidth: 200,
      showOverflowTooltip: true,
    },
    {
      label: () => t('prizeTransfer.created_at'),
      prop: 'created_at',
      width: 180,
    },
  ]
}
