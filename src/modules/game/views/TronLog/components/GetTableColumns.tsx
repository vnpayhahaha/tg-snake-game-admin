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
 * TRON交易日志表格列配置
 */
import type { MaProTableColumns, MaProTableExpose } from '@mineadmin/pro-table'
import type { TronTransactionLogVo } from '~/game/api/TronTransactionLog.ts'
import hasAuth from '@/utils/permission/hasAuth.ts'
import { deleteByIds, reprocess } from '~/game/api/TronTransactionLog.ts'
import { useMessage } from '@/hooks/useMessage.ts'
import { ResultCode } from '@/utils/ResultCode.ts'

export default function getTableColumns(
  t: any,
  proTableRef: any
): MaProTableColumns {
  const msg = useMessage()

  // 检查是否显示按钮
  const showBtn = (auth: string | string[], row?: TronTransactionLogVo) => {
    if (Array.isArray(auth)) {
      return auth.some(item => hasAuth(item))
    }
    return hasAuth(auth)
  }

  // 重新处理交易
  const handleReprocess = (row: TronTransactionLogVo) => {
    msg.confirm(t('tronLog.reprocessConfirm')).then(async () => {
      const response = await reprocess(row.id)
      if (response.code === ResultCode.SUCCESS) {
        msg.success(t('crud.success'))
        proTableRef.value?.refresh()
      }
      else {
        msg.error(response.message)
      }
    })
  }

  // 删除记录
  const handleDelete = (row: TronTransactionLogVo) => {
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
      label: () => t('tronLog.id'),
      prop: 'id',
      width: 80,
    },
    {
      label: () => t('tronLog.group_id'),
      prop: 'group_id',
      width: 100,
    },
    {
      label: () => t('tronLog.tx_hash'),
      prop: 'tx_hash',
      width: 200,
      showOverflowTooltip: true,
      cellRenderTo: {
        name: 'nmCellEnhance',
        props: {
          type: 'copyable',
        },
      },
    },
    {
      label: () => t('tronLog.from_address'),
      prop: 'from_address',
      width: 180,
      showOverflowTooltip: true,
      cellRenderTo: {
        name: 'nmCellEnhance',
        props: {
          type: 'copyable',
        },
      },
    },
    {
      label: () => t('tronLog.to_address'),
      prop: 'to_address',
      width: 180,
      showOverflowTooltip: true,
      cellRenderTo: {
        name: 'nmCellEnhance',
        props: {
          type: 'copyable',
        },
      },
    },
    {
      label: () => t('tronLog.amount'),
      prop: 'amount',
      width: 120,
      cellRenderTo: {
        name: 'nmCellEnhance',
        props: {
          type: 'tag',
          effect: 'dark',
          color: 'success',
          format: (row: TronTransactionLogVo) => `${row.amount} TRX`,
        },
      },
    },
    {
      label: () => t('tronLog.block_height'),
      prop: 'block_height',
      width: 120,
    },
    {
      label: () => t('tronLog.block_timestamp'),
      prop: 'block_timestamp',
      width: 180,
      cellRenderTo: {
        name: 'nmCellEnhance',
        props: {
          format: (row: TronTransactionLogVo) => {
            const date = new Date(row.block_timestamp * 1000)
            return date.toLocaleString('zh-CN')
          },
        },
      },
    },
    {
      label: () => t('tronLog.status'),
      prop: 'status',
      width: 100,
      cellRenderTo: {
        name: 'nmCellEnhance',
        props: {
          type: 'tag',
          color: (row: TronTransactionLogVo) => row.status === 'SUCCESS' ? 'success' : 'danger',
        },
      },
    },
    {
      label: () => t('tronLog.is_valid'),
      prop: 'is_valid',
      width: 100,
      cellRenderTo: {
        name: 'nmCellEnhance',
        props: {
          type: 'tag',
          format: (row: TronTransactionLogVo) => row.is_valid ? t('tronLog.valid') : t('tronLog.invalid'),
          color: (row: TronTransactionLogVo) => row.is_valid ? 'success' : 'danger',
        },
      },
    },
    {
      label: () => t('tronLog.invalid_reason'),
      prop: 'invalid_reason',
      minWidth: 200,
      showOverflowTooltip: true,
    },
    {
      label: () => t('tronLog.processed'),
      prop: 'processed',
      width: 100,
      cellRenderTo: {
        name: 'nmCellEnhance',
        props: {
          type: 'tag',
          format: (row: TronTransactionLogVo) => row.processed ? t('tronLog.processed_yes') : t('tronLog.processed_no'),
          color: (row: TronTransactionLogVo) => row.processed ? 'success' : 'warning',
        },
      },
    },
    {
      label: () => t('tronLog.created_at'),
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
            name: 'reprocess',
            show: (row: TronTransactionLogVo) => showBtn('tg_game:tron_log:reprocess') && row.is_valid && !row.processed,
            text: () => t('tronLog.reprocess'),
            onClick: ({ row }: any) => handleReprocess(row),
            actionType: 'warning',
          },
          {
            name: 'delete',
            show: () => showBtn('tg_game:tron_log:delete'),
            text: () => t('crud.delete'),
            onClick: ({ row }: any) => handleDelete(row),
            actionType: 'danger',
          },
        ],
        moreActions: [
          {
            name: 'viewTxHash',
            show: (row: TronTransactionLogVo) => !!row.tx_hash,
            text: () => t('tronLog.viewTxHash'),
            onClick: ({ row }: any) => {
              window.open(`https://tronscan.org/#/transaction/${row.tx_hash}`, '_blank')
            },
          },
          {
            name: 'viewFromAddress',
            show: (row: TronTransactionLogVo) => !!row.from_address,
            text: () => t('tronLog.viewFromAddress'),
            onClick: ({ row }: any) => {
              window.open(`https://tronscan.org/#/address/${row.from_address}`, '_blank')
            },
          },
          {
            name: 'viewToAddress',
            show: (row: TronTransactionLogVo) => !!row.to_address,
            text: () => t('tronLog.viewToAddress'),
            onClick: ({ row }: any) => {
              window.open(`https://tronscan.org/#/address/${row.to_address}`, '_blank')
            },
          },
        ],
      },
    },
  ]
}
