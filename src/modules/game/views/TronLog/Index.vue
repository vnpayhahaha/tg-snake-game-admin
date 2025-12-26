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
import type { UseDialogExpose } from '@/hooks/useDialog.ts'

import { deleteByIds, page } from '~/game/api/TronTransactionLog.ts'
import getSearchItems from './components/GetSearchItems.tsx'
import getTableColumns from './components/GetTableColumns.tsx'
import useDialog from '@/hooks/useDialog.ts'
import { useMessage } from '@/hooks/useMessage.ts'
import { ResultCode } from '@/utils/ResultCode.ts'

import SyncDialog from './components/SyncDialog.vue'

defineOptions({ name: 'game:tronLog' })

const proTableRef = ref<MaProTableExpose>() as Ref<MaProTableExpose>
const syncDialogRef = ref()
const selections = ref<any[]>([])
const i18n = useTrans() as TransType
const t = i18n.globalTrans
const local = i18n.localTrans
const msg = useMessage()

// 同步交易弹窗配置
const syncDialog: UseDialogExpose = useDialog({
  ok: (_, okLoadingState: (state: boolean) => void) => {
    okLoadingState(true)
    const elForm = syncDialogRef.value.maForm.getElFormRef()
    // 验证通过后
    elForm.validate().then(() => {
      syncDialogRef.value.submit().then((res: any) => {
        if (res.code === ResultCode.SUCCESS) {
          syncDialog.close()
          syncDialogRef.value.reset()
          proTableRef.value.refresh()
        }
        else {
          msg.error(res.message)
        }
      }).catch((err: any) => {
        msg.alertError(err)
      })
    }).catch()
    okLoadingState(false)
  },
})

// 参数配置
const options = ref<MaProTableOptions>({
  // 表格距离底部的像素偏移适配
  adaptionOffsetBottom: 161,
  header: {
    mainTitle: () => t('tronLog.index'),
  },
  // 表格参数
  tableOptions: {
    on: {
      // 表格选择事件
      onSelectionChange: (selection: any[]) => selections.value = selection,
    },
  },
  // 搜索参数
  searchOptions: {
    fold: true,
    text: {
      searchBtn: () => t('crud.search'),
      resetBtn: () => t('crud.reset'),
      isFoldBtn: () => t('crud.searchFold'),
      notFoldBtn: () => t('crud.searchUnFold'),
    },
  },
  // 搜索表单参数
  searchFormOptions: { labelWidth: '150px' },
  // 请求配置
  requestOptions: {
    api: page,
  },
})

// 架构配置
const schema = ref<MaProTableSchema>({
  // 搜索项
  searchItems: getSearchItems(t),
  // 表格列
  tableColumns: getTableColumns(t, proTableRef),
})

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
      <template #actions>
        <el-button
          v-auth="['tg_game:tron_log:syncTransactions']"
          type="primary"
          @click="() => {
            syncDialog.setTitle(t('tronLog.syncTransactions'))
            syncDialog.open()
          }"
        >
          {{ t('tronLog.syncTransactions') }}
        </el-button>
      </template>

      <template #toolbarLeft>
        <el-button-group>
          <el-button
            v-auth="['tg_game:tron_log:delete']"
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

    <!-- 同步交易弹窗 -->
    <ma-dialog
      v-model="syncDialog.visible.value"
      :title="syncDialog.title.value"
      :before-close="() => syncDialog.close()"
      @ok="syncDialog.ok"
    >
      <SyncDialog ref="syncDialogRef" />
    </ma-dialog>
  </div>
</template>
