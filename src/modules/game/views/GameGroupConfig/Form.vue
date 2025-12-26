<script setup lang="ts">
import type { MaFormExpose } from '@mineadmin/form'
import type { Ref } from 'vue'
import type { GameGroupConfigVo } from '~/game/api/GameGroupConfig.ts'

import { create, save } from '~/game/api/GameGroupConfig.ts'
import getFormItems from './components/GetFormItems.tsx'

const props = defineProps<{
  data?: GameGroupConfigVo
  formType: 'add' | 'edit'
}>()

const { globalTrans: t, localTrans: local } = useTrans()
const formRef = ref<MaFormExpose>() as Ref<MaFormExpose>

// 表单模型
const model = ref<GameGroupConfigVo>({
  id: 0,
  tenant_id: '',
  tg_chat_id: 0,
  tg_chat_title: '',
  wallet_address: '',
  wallet_change_count: 0,
  pending_wallet_address: '',
  wallet_change_status: 1,
  wallet_change_start_at: '',
  wallet_change_end_at: '',
  hot_wallet_address: '',
  hot_wallet_private_key: '',
  bet_amount: 5,
  platform_fee_rate: 0.1,
  telegram_admin_whitelist: '',
  status: 1,
  created_at: '',
  updated_at: '',
})

watch(
  () => props.data,
  (val) => {
    if (val && props.formType === 'edit') {
      model.value = { ...val }
    }
  },
  { immediate: true }
)

// 新增
async function add() {
  return await create(model.value)
}

// 编辑
async function edit() {
  return await save(model.value.id, model.value)
}

defineExpose({ add, edit, maForm: formRef })
</script>

<template>
  <ma-form
    ref="formRef"
    v-model="model"
    :columns="getFormItems(formType, t, model)"
    :options="{
      labelWidth: '180px',
    }"
  />
</template>
