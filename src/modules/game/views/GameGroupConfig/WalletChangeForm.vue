<script setup lang="ts">
import type { MaFormExpose } from '@mineadmin/form'
import type { Ref } from 'vue'
import type { GameGroupConfigVo } from '~/game/api/GameGroupConfig.ts'

import { startWalletChange } from '~/game/api/GameGroupConfig.ts'
import getWalletChangeFormItems, { type WalletChangeFormVo } from './components/GetWalletChangeFormItems.tsx'

const props = defineProps<{
  data?: GameGroupConfigVo
}>()

const { globalTrans: t, localTrans: local } = useTrans()
const formRef = ref<MaFormExpose>() as Ref<MaFormExpose>

// 表单模型
const model = ref<WalletChangeFormVo>({
  new_wallet_address: '',
  cooldown_minutes: 10,
})

// 开始钱包变更
async function submit() {
  if (props.data?.id) {
    return await startWalletChange(props.data.id, model.value)
  }
}

defineExpose({ submit, maForm: formRef })
</script>

<template>
  <ma-form
    ref="formRef"
    v-model="model"
    :columns="getWalletChangeFormItems(t, model)"
    :options="{
      labelWidth: '180px',
    }"
  />
</template>
