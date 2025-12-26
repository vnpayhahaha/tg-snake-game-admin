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

import { deleteByIds, page } from '~/game/api/PrizeRecord.ts'
import getSearchItems from './components/GetSearchItems.tsx'
import getTableColumns from './components/GetTableColumns.tsx'
import useDialog from '@/hooks/useDialog.ts'
import { useMessage } from '@/hooks/useMessage.ts'
import { ResultCode } from '@/utils/ResultCode.ts'

import TransferListDialog from './components/TransferListDialog.vue'

defineOptions({ name: 'game:prizeRecord' })

const proTableRef = ref<MaProTableExpose>() as Ref<MaProTableExpose>
const transferListDialogRef = ref()
const selections = ref<any[]>([])
const i18n = useTrans() as TransType
const t = i18n.globalTrans
const local = i18n.localTrans
const msg = useMessage()

// 转账详情弹窗配置
const transferDialog: UseDialogExpose = useDialog({})

// 参数配置
const options = ref<MaProTableOptions>({
  // 表格距离底部的像素偏移适配
  adaptionOffsetBottom: 161,
  header: {
    mainTitle: () => t('prizeRecord.index'),
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
  tableColumns: getTableColumns(transferDialog, t, proTableRef),
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
      <template #toolbarLeft>
        <el-button-group>
          <el-button
            v-auth="['tg_game:prize:delete']"
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

    <!-- 转账详情弹窗 -->
    <ma-dialog
      v-model="transferDialog.visible.value"
      :title="transferDialog.title.value"
      :before-close="() => transferDialog.close()"
      width="900px"
    >
      <TransferListDialog ref="transferListDialogRef" :data="transferDialog.data.value?.data" />
    </ma-dialog>
  </div>
</template>
