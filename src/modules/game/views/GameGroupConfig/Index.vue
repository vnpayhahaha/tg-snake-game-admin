<script setup lang="tsx">
import type { MaProTableExpose, MaProTableOptions, MaProTableSchema } from '@mineadmin/pro-table'
import type { Ref } from 'vue'
import type { TransType } from '@/hooks/auto-imports/useTrans.ts'
import type { UseDialogExpose } from '@/hooks/useDialog.ts'

import { deleteByIds, page } from '~/game/api/GameGroupConfig.ts'
import getSearchItems from './components/GetSearchItems.tsx'
import getTableColumns from './components/GetTableColumns.tsx'
import useDialog from '@/hooks/useDialog.ts'
import { useMessage } from '@/hooks/useMessage.ts'
import { ResultCode } from '@/utils/ResultCode.ts'

import Form from './Form.vue'
import WalletChangeForm from './WalletChangeForm.vue'

defineOptions({ name: 'game:gameGroupConfig' })

const proTableRef = ref<MaProTableExpose>() as Ref<MaProTableExpose>
const formRef = ref()
const walletChangeFormRef = ref()
const selections = ref<any[]>([])
const i18n = useTrans() as TransType
const t = i18n.globalTrans
const local = i18n.localTrans
const msg = useMessage()

// 主表单弹窗配置
const maDialog: UseDialogExpose = useDialog({
  // 保存数据
  ok: ({ formType }, okLoadingState: (state: boolean) => void) => {
    okLoadingState(true)
    if (['add', 'edit'].includes(formType)) {
      const elForm = formRef.value.maForm.getElFormRef()
      // 验证通过后
      elForm.validate().then(() => {
        switch (formType) {
          // 新增
          case 'add':
            formRef.value.add().then((res: any) => {
              res.code === ResultCode.SUCCESS ? msg.success(t('crud.createSuccess')) : msg.error(res.message)
              maDialog.close()
              proTableRef.value.refresh()
            }).catch((err: any) => {
              msg.alertError(err.response.data?.message)
            })
            break
          // 修改
          case 'edit':
            formRef.value.edit().then((res: any) => {
              res.code === 200 ? msg.success(t('crud.updateSuccess')) : msg.error(res.message)
              maDialog.close()
              proTableRef.value.refresh()
            }).catch((err: any) => {
              msg.alertError(err.response.data?.message)
            })
            break
        }
      }).catch()
    }
    okLoadingState(false)
  },
})

// 钱包变更弹窗配置
const walletChangeDialog: UseDialogExpose = useDialog({
  // 保存数据
  ok: (_, okLoadingState: (state: boolean) => void) => {
    okLoadingState(true)
    const elForm = walletChangeFormRef.value.maForm.getElFormRef()
    // 验证通过后
    elForm.validate().then(() => {
      walletChangeFormRef.value.submit().then((res: any) => {
        if (res.code === ResultCode.SUCCESS) {
          msg.success(t('crud.success'))
          walletChangeDialog.close()
          proTableRef.value.refresh()
        }
        else {
          msg.error(res.message)
        }
      }).catch((err: any) => {
        msg.alertError(err.response.data?.message)
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
    mainTitle: () => local('gameGroupConfig.index'),
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
  tableColumns: getTableColumns(maDialog, walletChangeDialog, t),
})

// 批量删除
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
</script>

<template>
  <div class="mine-layout pt-3">
    <MaProTable ref="proTableRef" :options="options" :schema="schema">
      <template #actions>
        <el-button
          v-auth="['tg_game:config:create']"
          type="primary"
          @click="() => {
            maDialog.setTitle(t('crud.add'))
            maDialog.open({ formType: 'add' })
          }"
        >
          {{ t('crud.add') }}
        </el-button>
      </template>

      <template #toolbarLeft>
        <el-button-group>
          <el-button
            v-auth="['tg_game:config:delete']"
            type="danger"
            plain
            :disabled="selections.length < 1"
            @click="handleDelete"
          >
            {{ t('crud.batchDelete') }}
          </el-button>
        </el-button-group>
      </template>
    </MaProTable>

    <!-- 主表单弹窗 -->
    <ma-dialog
      v-model="maDialog.visible.value"
      :title="maDialog.title.value"
      :before-close="() => maDialog.close()"
      @ok="maDialog.ok"
    >
      <Form ref="formRef" :data="maDialog.data.value?.data" :form-type="maDialog.data.value?.formType" />
    </ma-dialog>

    <!-- 钱包变更弹窗 -->
    <ma-dialog
      v-model="walletChangeDialog.visible.value"
      :title="walletChangeDialog.title.value"
      :before-close="() => walletChangeDialog.close()"
      @ok="walletChangeDialog.ok"
    >
      <WalletChangeForm ref="walletChangeFormRef" :data="walletChangeDialog.data.value?.data" />
    </ma-dialog>
  </div>
</template>
