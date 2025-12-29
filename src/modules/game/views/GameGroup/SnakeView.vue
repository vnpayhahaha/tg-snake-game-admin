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
import type { GameGroupVo } from '~/game/api/GameGroup.ts'
import type { TransType } from '@/hooks/auto-imports/useTrans.ts'

const props = defineProps<{
  data: GameGroupVo
}>()

const i18n = useTrans() as TransType
const t = i18n.globalTrans

// 解析蛇身节点
const snakeNodes = computed(() => {
  if (!props.data?.current_snake_nodes) {
    return []
  }
  return props.data.current_snake_nodes.split(',').filter(Boolean)
})

// 检测已中奖的节点索引（相同数字首尾匹配，已中奖节点不再参与后续匹配）
const winningIndices = computed(() => {
  const nodes = snakeNodes.value
  const indices: Set<number> = new Set()
  const lastPosition: Map<string, number> = new Map()

  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i]
    if (lastPosition.has(node)) {
      const prevPos = lastPosition.get(node)!
      // 检查上次位置是否已被标记为中奖
      if (!indices.has(prevPos)) {
        // 标记从上次位置到当前位置的所有节点为中奖
        for (let j = prevPos; j <= i; j++) {
          indices.add(j)
        }
        // 移除这个数字的记录，已完成匹配
        lastPosition.delete(node)
      } else {
        // 上次位置已被标记为中奖，更新为当前位置继续等待匹配
        lastPosition.set(node, i)
      }
    } else {
      lastPosition.set(node, i)
    }
  }

  return indices
})

// 蛇身总长度
const totalLength = computed(() => snakeNodes.value.length)

// 蛇身有效长度（排除已中奖节点）
const effectiveLength = computed(() => totalLength.value - winningIndices.value.size)

// 判断节点是否已中奖
const isWinningNode = (index: number) => winningIndices.value.has(index)

// 获取节点类型样式
const getNodeType = (index: number) => {
  if (index === 0) return 'danger'
  if (index === snakeNodes.value.length - 1) return 'success'
  return 'info'
}
</script>

<template>
  <div class="snake-view">
    <el-descriptions :column="2" border>
      <el-descriptions-item :label="t('gameGroup.group_name')">
        {{ data.config?.tg_chat_title || '-' }}
      </el-descriptions-item>
      <el-descriptions-item :label="t('gameGroup.prize_pool_amount')">
        <el-tag type="success">{{ data.prize_pool_amount }} TRX</el-tag>
      </el-descriptions-item>
      <el-descriptions-item :label="t('gameGroup.snake_length')">
        <el-tag type="primary">{{ effectiveLength }}</el-tag>
        <span v-if="winningIndices.size > 0" class="ml-2 text-gray-400">
          ({{ t('gameGroup.total') }}{{ totalLength }})
        </span>
      </el-descriptions-item>
      <el-descriptions-item :label="t('gameGroup.last_prize_amount')">
        {{ data.last_prize_amount ? `${data.last_prize_amount} TRX` : '-' }}
      </el-descriptions-item>
      <el-descriptions-item :label="t('gameGroup.last_prize_at')" :span="2">
        {{ data.last_prize_at || '-' }}
      </el-descriptions-item>
    </el-descriptions>

    <div v-if="snakeNodes.length > 0" class="snake-nodes mt-4">
      <div class="node-header mb-2">
        <span class="font-bold">{{ t('gameGroup.snakeNodeList') }}:</span>
        <span class="legend">
          <el-tag type="danger" size="small" effect="dark">{{ t('gameGroup.snakeHead') }}</el-tag>
          <el-tag type="success" size="small" effect="dark">{{ t('gameGroup.snakeTail') }}</el-tag>
          <span class="winning-legend">{{ t('gameGroup.won') }}</span>
        </span>
      </div>
      <div class="node-list">
        <div
          v-for="(node, index) in snakeNodes"
          :key="index"
          class="node-item"
          :class="{ 'is-winning': isWinningNode(index) }"
        >
          <el-tag :type="getNodeType(index)" :effect="isWinningNode(index) ? 'plain' : 'dark'">
            <span class="node-index">#{{ index + 1 }}</span>
            <span class="node-value">{{ node }}</span>
          </el-tag>
        </div>
      </div>
    </div>

    <el-empty v-else :description="t('gameGroup.noSnakeNodes')" />
  </div>
</template>

<style scoped lang="scss">
.snake-view {
  padding: 10px;
}

.snake-nodes {
  .node-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 8px;

    .legend {
      display: flex;
      gap: 8px;
      align-items: center;

      .winning-legend {
        display: inline-flex;
        align-items: center;
        padding: 2px 8px;
        font-size: 12px;
        background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
        border: 1px solid #f59e0b;
        border-radius: 4px;
        color: #92400e;
        text-decoration: line-through;
        text-decoration-color: #dc2626;
        text-decoration-thickness: 2px;
      }
    }
  }

  .node-list {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    max-height: 300px;
    overflow-y: auto;
    padding: 4px;
  }

  .node-item {
    position: relative;

    .el-tag {
      padding: 6px 10px;
      font-size: 13px;

      .node-index {
        font-weight: bold;
        margin-right: 6px;
        opacity: 0.8;
      }

      .node-value {
        font-family: monospace;
      }
    }

    &.is-winning {
      .el-tag {
        background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%) !important;
        border: 1px solid #f59e0b !important;
        color: #92400e !important;
        position: relative;

        .node-value {
          text-decoration: line-through;
          text-decoration-color: #dc2626;
          text-decoration-thickness: 2px;
        }
      }
    }
  }
}
</style>
