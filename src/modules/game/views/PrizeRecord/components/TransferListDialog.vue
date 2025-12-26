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
import type { Ref } from 'vue'
import type { PrizeRecordVo } from '~/game/api/PrizeRecord.ts'
import { getTransfers } from '~/game/api/PrizeRecord.ts'
import { useMessage } from '@/hooks/useMessage.ts'

const props = defineProps<{
  data?: PrizeRecordVo
}>()

const { globalTrans: t, localTrans: local } = useTrans()
const msg = useMessage()
const loading = ref(false)
const transfers = ref<any[]>([])

// 获取转账详情
async function loadTransfers() {
  if (!props.data?.id)
    return

  loading.value = true
  try {
    const response = await getTransfers(props.data.id)
    if (response.code === 200) {
      transfers.value = response.data || []
    }
    else {
      msg.error(response.message)
    }
  }
  catch (err: any) {
    msg.alertError(err)
  }
  finally {
    loading.value = false
  }
}

// 监听数据变化
watch(
  () => props.data,
  (val) => {
    if (val) {
      loadTransfers()
    }
  },
  { immediate: true }
)

// 获取状态标签类型
function getStatusType(status: number) {
  const statusMap: Record<number, string> = {
    1: 'info',
    2: 'warning',
    3: 'success',
    4: 'danger',
  }
  return statusMap[status] || 'info'
}

// 获取状态文本
function getStatusText(status: number) {
  const statusMap: Record<number, string> = {
    1: t('prizeTransfer.status_pending'),
    2: t('prizeTransfer.status_processing'),
    3: t('prizeTransfer.status_success'),
    4: t('prizeTransfer.status_failed'),
  }
  return statusMap[status] || t('crud.unknown')
}

defineExpose({ loadTransfers })
</script>

<template>
  <div v-loading="loading" class="transfer-list-dialog">
    <!-- 中奖记录信息 -->
    <el-descriptions v-if="data" :column="2" border class="mb-4">
      <el-descriptions-item :label="t('prizeRecord.prize_serial_no')">
        {{ data.prize_serial_no }}
      </el-descriptions-item>
      <el-descriptions-item :label="t('prizeRecord.winner_count')">
        {{ data.winner_count }} 人
      </el-descriptions-item>
      <el-descriptions-item :label="t('prizeRecord.prize_amount')">
        {{ data.prize_amount }} TRX
      </el-descriptions-item>
      <el-descriptions-item :label="t('prizeRecord.prize_per_winner')">
        {{ data.prize_per_winner }} TRX
      </el-descriptions-item>
    </el-descriptions>

    <!-- 转账列表 -->
    <el-table :data="transfers" border stripe>
      <el-table-column type="index" label="#" width="60" />
      <el-table-column :label="t('prizeTransfer.player_address')" prop="player_address" show-overflow-tooltip />
      <el-table-column :label="t('prizeTransfer.amount')" prop="amount" width="120">
        <template #default="{ row }">
          <el-tag type="success">{{ row.amount }} TRX</el-tag>
        </template>
      </el-table-column>
      <el-table-column :label="t('prizeTransfer.status')" prop="status" width="100">
        <template #default="{ row }">
          <el-tag :type="getStatusType(row.status)">
            {{ getStatusText(row.status) }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column :label="t('prizeTransfer.tx_hash')" prop="tx_hash" show-overflow-tooltip width="200" />
      <el-table-column :label="t('prizeTransfer.retry_count')" prop="retry_count" width="100" />
      <el-table-column :label="t('prizeTransfer.error_message')" prop="error_message" show-overflow-tooltip />
    </el-table>

    <!-- 空状态 -->
    <el-empty v-if="!loading && transfers.length === 0" :description="t('crud.noData')" />
  </div>
</template>

<style scoped lang="scss">
.transfer-list-dialog {
  min-height: 200px;
}
</style>
