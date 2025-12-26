<!--
 - MineAdmin is committed to providing solutions for quickly building web applications
 - Please view the LICENSE file that was distributed with this source code,
 - For the full copyright and license information.
 - Thank you very much for using MineAdmin.
 -
 - @Author X.Mo<root@imoi.cn>
 - @Link   https://github.com/mineadmin
-->
<script setup lang="ts">
import type { MaFormExpose } from '@mineadmin/form'
import type { GameGroupConfigVo } from '~/game/api/GameGroupConfig.ts'

import { startWalletChange } from '~/game/api/GameGroupConfig.ts'
import getWalletChangeFormItems, { type WalletChangeFormVo } from './components/GetWalletChangeFormItems.tsx'
import useForm from '@/hooks/useForm.ts'
import { ResultCode } from '@/utils/ResultCode.ts'

const props = defineProps<{
  data?: GameGroupConfigVo
}>()

const t = useTrans().globalTrans
const maFormRef = ref<MaFormExpose>()
const formModel = ref<WalletChangeFormVo>({
  new_wallet_address: '',
  cooldown_minutes: 10,
})

useForm('maFormRef').then((form: MaFormExpose) => {
  form.setItems(getWalletChangeFormItems(t))
  form.setOptions({
    labelWidth: '180px',
  })
})

// 开始钱包变更
function submit(): Promise<any> {
  return new Promise((resolve, reject) => {
    if (props.data?.id) {
      startWalletChange(props.data.id, formModel.value).then((res: any) => {
        res.code === ResultCode.SUCCESS ? resolve(res) : reject(res)
      }).catch((err) => {
        reject(err.response.message)
      })
    }
    else {
      reject('缺少配置ID')
    }
  })
}

defineExpose({ submit, maForm: maFormRef })
</script>

<template>
  <ma-form ref="maFormRef" v-model="formModel" />
</template>
