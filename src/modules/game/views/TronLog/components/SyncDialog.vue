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
import type { MaFormExpose } from '@mineadmin/form'
import type { Ref } from 'vue'
import { syncTransactions } from '~/game/api/TronTransactionLog.ts'
import { useMessage } from '@/hooks/useMessage.ts'
import { ResultCode } from '@/utils/ResultCode.ts'

const { globalTrans: t, localTrans: local } = useTrans()
const formRef = ref<MaFormExpose>() as Ref<MaFormExpose>
const msg = useMessage()

// 表单模型
const model = ref({
  group_id: undefined as number | undefined,
  start_block: undefined as number | undefined,
  end_block: undefined as number | undefined,
})

// 表单配置
const formColumns = computed(() => [
  {
    label: () => t('tronTransactionLog.group_id'),
    prop: 'group_id',
    render: () => <el-input-number v-model={model.value.group_id} placeholder={t('tronTransactionLog.syncGroupIdTip')} controls={false} style="width: 100%" />,
    renderTip: t('tronTransactionLog.syncGroupIdTip'),
  },
  {
    label: () => t('tronTransactionLog.start_block'),
    prop: 'start_block',
    render: () => <el-input-number v-model={model.value.start_block} placeholder={t('tronTransactionLog.syncStartBlockTip')} controls={false} style="width: 100%" />,
    renderTip: t('tronTransactionLog.syncStartBlockTip'),
  },
  {
    label: () => t('tronTransactionLog.end_block'),
    prop: 'end_block',
    render: () => <el-input-number v-model={model.value.end_block} placeholder={t('tronTransactionLog.syncEndBlockTip')} controls={false} style="width: 100%" />,
    renderTip: t('tronTransactionLog.syncEndBlockTip'),
  },
])

// 同步交易
async function submit() {
  const data: any = {}
  if (model.value.group_id)
    data.group_id = model.value.group_id
  if (model.value.start_block)
    data.start_block = model.value.start_block
  if (model.value.end_block)
    data.end_block = model.value.end_block

  const response = await syncTransactions(data)
  if (response.code === ResultCode.SUCCESS) {
    const result = response.data
    msg.success(`${t('tronTransactionLog.syncSuccess')}: ${result.synced_count} 条, 有效: ${result.valid_count}, 无效: ${result.invalid_count}`)
  }
  return response
}

// 重置表单
function reset() {
  model.value = {
    group_id: undefined,
    start_block: undefined,
    end_block: undefined,
  }
}

defineExpose({ submit, maForm: formRef, reset })
</script>

<template>
  <ma-form
    ref="formRef"
    v-model="model"
    :columns="formColumns"
    :options="{
      labelWidth: '120px',
    }"
  />
</template>
