<script setup lang="tsx">
import type { MaProTableExpose, MaProTableOptions, MaProTableSchema } from '@mineadmin/pro-table'
import type { Ref } from 'vue'
import type { TransType } from '@/hooks/auto-imports/useTrans.ts'
import type { UseDialogExpose } from '@/hooks/useDialog.ts'

import { deleteByIds, exportData, page, realDelete } from '~/game/api/TelegramCommandMessage.ts'
import getSearchItems from './components/GetSearchItems.tsx'
import getTableColumns from './components/GetTableColumns.tsx'
import useDialog from '@/hooks/useDialog.ts'
import { useMessage } from '@/hooks/useMessage.ts'
import { ResultCode } from '@/utils/ResultCode.ts'

import DetailDialog from './components/DetailDialog.vue'

defineOptions({ name: 'game:telegramCommandMessage' })

const proTableRef = ref<MaProTableExpose>() as Ref<MaProTableExpose>
const detailDialogRef = ref()
const selections = ref<any[]>([])
const i18n = useTrans() as TransType
const t = i18n.globalTrans
const local = i18n.localTrans
const msg = useMessage()
const exportLoading = ref(false)

// 详情弹窗配置
const detailDialog: UseDialogExpose = useDialog({})

// 参数配置
const options = ref<MaProTableOptions>({
  // 表格距离底部的像素偏移适配
  adaptionOffsetBottom: 161,
  header: {
    mainTitle: () => local('telegramCommandMessage.index'),
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
  tableColumns: getTableColumns(detailDialog, t, proTableRef),
})

// 导出数据
async function handleExport() {
  exportLoading.value = true
  try {
    const params = proTableRef.value.getSearchData()
    const response = await exportData(params)

    // 创建下载链接
    const blob = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `telegram_command_messages_${Date.now()}.xlsx`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)

    msg.success(t('crud.exportSuccess'))
  }
  catch (err: any) {
    msg.alertError(err.response?.data?.message || t('crud.exportFailed'))
  }
  finally {
    exportLoading.value = false
  }
}

// 批量删除（软删除）
function handleDelete() {
  const ids = selections.value.map((item: any) => item.id)
  msg.delConfirm(t('crud.delMessage')).then(async () => {
    const response = await deleteByIds(ids)
    if (response.code === ResultCode.SUCCESS) {
      msg.success(t('crud.delSuccess'))
      proTableRef.value.refresh()
    }
  })
}

// 批量真实删除
function handleRealDelete() {
  const ids = selections.value.map((item: any) => item.id)
  msg.delConfirm(t('telegramCommandMessage.realDeleteConfirm')).then(async () => {
    const response = await realDelete(ids)
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
          v-auth="['tg_game:command_message:export']"
          type="success"
          :loading="exportLoading"
          @click="handleExport"
        >
          {{ t('telegramCommandMessage.export') }}
        </el-button>
      </template>

      <template #toolbarLeft>
        <el-button-group>
          <el-button
            v-auth="['tg_game:command_message:delete']"
            type="danger"
            plain
            :disabled="selections.length < 1"
            @click="handleDelete"
          >
            {{ t('crud.batchDelete') }}
          </el-button>
          <el-button
            v-auth="['tg_game:command_message:realDelete']"
            type="danger"
            :disabled="selections.length < 1"
            @click="handleRealDelete"
          >
            {{ t('telegramCommandMessage.realDelete') }}
          </el-button>
        </el-button-group>
      </template>
    </MaProTable>

    <!-- 详情弹窗 -->
    <ma-dialog
      v-model="detailDialog.visible.value"
      :title="detailDialog.title.value"
      :before-close="() => detailDialog.close()"
      width="800px"
    >
      <DetailDialog ref="detailDialogRef" :data="detailDialog.data.value?.data" />
    </ma-dialog>
  </div>
</template>
