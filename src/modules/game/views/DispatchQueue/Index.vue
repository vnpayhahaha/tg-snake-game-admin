<!--
 - MineAdmin is committed to providing solutions for quickly building web applications
 - Please view the LICENSE file that was distributed with this source code,
 - For the full copyright and license information.
 - Thank you very much for using MineAdmin.
 -
 - @Author X.Mo<root@imoi.cn>
 - @Link   https://github.com/mineadmin
-->
<script setup lang="tsx">
import type { MaProTableExpose, MaProTableOptions, MaProTableSchema } from '@mineadmin/pro-table'
import type { Ref } from 'vue'
import type { TransType } from '@/hooks/auto-imports/useTrans.ts'

import { batchRetry, deleteByIds, page } from '~/game/api/DispatchQueue.ts'
import getSearchItems from './components/GetSearchItems.tsx'
import getTableColumns from './components/GetTableColumns.tsx'
import { useMessage } from '@/hooks/useMessage.ts'
import { ResultCode } from '@/utils/ResultCode.ts'

defineOptions({ name: 'game:dispatchQueue' })

const proTableRef = ref<MaProTableExpose>() as Ref<MaProTableExpose>
const selections = ref<any[]>([])
const i18n = useTrans() as TransType
const t = i18n.globalTrans
const msg = useMessage()

// 参数配置
const options = ref<MaProTableOptions>({
  adaptionOffsetBottom: 161,
  header: {
    mainTitle: () => t('dispatchQueue.index'),
  },
  tableOptions: {
    on: {
      onSelectionChange: (selection: any[]) => selections.value = selection,
    },
  },
  searchOptions: {
    fold: true,
    text: {
      searchBtn: () => t('crud.search'),
      resetBtn: () => t('crud.reset'),
      isFoldBtn: () => t('crud.searchFold'),
      notFoldBtn: () => t('crud.searchUnFold'),
    },
  },
  searchFormOptions: { labelWidth: '120px' },
  requestOptions: {
    api: page,
  },
})

// 架构配置
const schema = ref<MaProTableSchema>({
  searchItems: getSearchItems(t),
  tableColumns: getTableColumns(t, proTableRef),
})

// 批量重试
function handleBatchRetry() {
  const ids = selections.value.map((item: any) => item.id)
  msg.confirm(t('dispatchQueue.batchRetryConfirm')).then(async () => {
    const response = await batchRetry({ queue_ids: ids })
    if (response.code === ResultCode.SUCCESS) {
      msg.success(`${t('crud.success')}: ${response.data?.success || 0}/${response.data?.total || 0}`)
      proTableRef.value.refresh()
    }
    else {
      msg.error(response.message)
    }
  })
}

// 批量删除
function handleDelete() {
  const ids = selections.value.map((item: any) => item.id)
  msg.confirm(t('crud.delMessage')).then(async () => {
    const response = await deleteByIds(ids)
    if (response.code === ResultCode.SUCCESS) {
      msg.success(t('crud.delSuccess'))
      proTableRef.value.refresh()
    }
  })
}
</script>

<template>
  <div class="mine-layout pt-3">
    <MaProTable ref="proTableRef" :options="options" :schema="schema">
      <template #toolbarLeft>
        <el-button-group>
          <el-button
            v-auth="['tg_game:dispatch_queue:batchRetry']"
            type="warning"
            plain
            :disabled="selections.length < 1"
            @click="handleBatchRetry"
          >
            {{ t('dispatchQueue.batchRetry') }}
          </el-button>
          <el-button
            v-auth="['tg_game:dispatch_queue:delete']"
            type="danger"
            plain
            :disabled="selections.length < 1"
            @click="handleDelete"
          >
            {{ t('crud.delete') }}
          </el-button>
        </el-button-group>
      </template>
    </MaProTable>
  </div>
</template>
