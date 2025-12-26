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
import type { TelegramCommandMessageVo } from '~/game/api/TelegramCommandMessage.ts'

const props = defineProps<{
  data?: TelegramCommandMessageVo
}>()

const { globalTrans: t, localTrans: local } = useTrans()

// 获取成功状态标签类型
function getStatusType(isSuccess: number) {
  return isSuccess === 1 ? 'success' : 'danger'
}

// 获取成功状态文本
function getStatusText(isSuccess: number) {
  return isSuccess === 1 ? t('telegramCommandMessage.success') : t('telegramCommandMessage.failed')
}
</script>

<template>
  <div v-if="data" class="detail-dialog">
    <el-descriptions :column="2" border>
      <el-descriptions-item :label="t('telegramCommandMessage.id')">
        {{ data.id }}
      </el-descriptions-item>
      <el-descriptions-item :label="t('telegramCommandMessage.group_id')">
        {{ data.group_id }}
      </el-descriptions-item>
      <el-descriptions-item :label="t('telegramCommandMessage.group_name')" :span="2">
        {{ data.group_name }}
      </el-descriptions-item>
      <el-descriptions-item :label="t('telegramCommandMessage.tg_chat_id')">
        {{ data.tg_chat_id }}
      </el-descriptions-item>
      <el-descriptions-item :label="t('telegramCommandMessage.tg_user_id')">
        {{ data.tg_user_id }}
      </el-descriptions-item>
      <el-descriptions-item :label="t('telegramCommandMessage.tg_username')" :span="2">
        {{ data.tg_username }}
      </el-descriptions-item>
      <el-descriptions-item :label="t('telegramCommandMessage.command')">
        <el-tag type="primary">{{ data.command }}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item :label="t('telegramCommandMessage.is_success')">
        <el-tag :type="getStatusType(data.is_success)">
          {{ getStatusText(data.is_success) }}
        </el-tag>
      </el-descriptions-item>
      <el-descriptions-item :label="t('telegramCommandMessage.message_text')" :span="2">
        <div class="text-content">
          {{ data.message_text }}
        </div>
      </el-descriptions-item>
      <el-descriptions-item :label="t('telegramCommandMessage.response_text')" :span="2">
        <div class="text-content">
          {{ data.response_text }}
        </div>
      </el-descriptions-item>
      <el-descriptions-item v-if="data.error_message" :label="t('telegramCommandMessage.error_message')" :span="2">
        <div class="error-content">
          {{ data.error_message }}
        </div>
      </el-descriptions-item>
      <el-descriptions-item :label="t('telegramCommandMessage.created_at')">
        {{ data.created_at }}
      </el-descriptions-item>
      <el-descriptions-item :label="t('telegramCommandMessage.updated_at')">
        {{ data.updated_at }}
      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<style scoped lang="scss">
.detail-dialog {
  .text-content {
    white-space: pre-wrap;
    word-break: break-all;
    max-height: 300px;
    overflow-y: auto;
  }

  .error-content {
    color: var(--el-color-danger);
    white-space: pre-wrap;
    word-break: break-all;
  }
}
</style>
