<script setup lang="ts">
import type { MaFormExpose } from '@mineadmin/form'
import type { Ref } from 'vue'
import type { GameGroupVo } from '~/game/api/GameGroup.ts'

import { create, save } from '~/game/api/GameGroup.ts'
import getFormItems from './components/GetFormItems.tsx'

const props = defineProps<{
  data?: GameGroupVo
  formType: 'add' | 'edit'
}>()

const { globalTrans: t, localTrans: local } = useTrans()
const formRef = ref<MaFormExpose>() as Ref<MaFormExpose>

// 表单模型
const model = ref<GameGroupVo>({
  id: 0,
  config_id: 0,
  group_name: '',
  status: 1,
  tg_chat_id: 0,
  prize_pool_amount: 0,
  current_snake_nodes: '',
  last_snake_nodes: '',
  last_prize_nodes: '',
  last_prize_amount: 0,
  last_prize_address: '',
  last_prize_serial_no: '',
  last_prize_at: '',
  version: 0,
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
      labelWidth: '150px',
    }"
  />
</template>
