# 贪吃蛇游戏后台管理模块

## 已完成工作

✅ **API 层 (11个模块)**
- GameGroup.ts - 游戏群组管理
- GameGroupConfig.ts - 群组配置管理
- GameGroupConfigLog.ts - 配置变更日志
- PlayerWalletBinding.ts - 玩家钱包绑定
- PlayerWalletBindingLog.ts - 钱包绑定日志
- SnakeNode.ts - 蛇身节点管理
- PrizeRecord.ts - 中奖记录管理
- PrizeTransfer.ts - 中奖转账管理
- DispatchQueue.ts - 派奖队列管理
- TronTransactionLog.ts - TRON交易日志
- TelegramCommandMessage.ts - Telegram命令消息记录

✅ **国际化文件**
- zh_CN[简体中文].yaml - 中文翻译
- en[English].yaml - 英文翻译

✅ **完整示例页面 - GameGroup (游戏群组)**
- Index.vue - 列表页面
- Form.vue - 表单页面
- components/GetTableColumns.tsx - 表格列定义
- components/GetFormItems.tsx - 表单项定义
- components/GetSearchItems.tsx - 搜索项定义

## 目录结构

```
src/modules/game/
├── api/                              # API层
│   ├── GameGroup.ts
│   ├── GameGroupConfig.ts
│   ├── GameGroupConfigLog.ts
│   ├── PlayerWalletBinding.ts
│   ├── PlayerWalletBindingLog.ts
│   ├── SnakeNode.ts
│   ├── PrizeRecord.ts
│   ├── PrizeTransfer.ts
│   ├── DispatchQueue.ts
│   ├── TronTransactionLog.ts
│   └── TelegramCommandMessage.ts
├── locales/                          # 国际化
│   ├── zh_CN[简体中文].yaml
│   └── en[English].yaml
└── views/                            # 视图层
    └── GameGroup/                    # 示例页面
        ├── Index.vue
        ├── Form.vue
        └── components/
            ├── GetTableColumns.tsx
            ├── GetFormItems.tsx
            └── GetSearchItems.tsx
```

## 如何继续完成其他页面

参照 `GameGroup` 页面的结构,创建其他10个页面。每个页面需要以下文件:

### 1. 创建目录

```bash
mkdir -p src/modules/game/views/{模块名}/components
```

### 2. 创建5个文件

1. **Index.vue** - 主列表页面
   - 参考: `src/modules/game/views/GameGroup/Index.vue`
   - 主要功能: 表格展示、搜索、新增、编辑、删除

2. **Form.vue** - 表单页面
   - 参考: `src/modules/game/views/GameGroup/Form.vue`
   - 主要功能: 新增和编辑数据的表单

3. **components/GetTableColumns.tsx** - 表格列定义
   - 参考: `src/modules/game/views/GameGroup/components/GetTableColumns.tsx`
   - 定义表格显示的列和操作按钮

4. **components/GetSearchItems.tsx** - 搜索项定义
   - 参考: `src/modules/game/views/GameGroup/components/GetSearchItems.tsx`
   - 定义搜索表单的字段

5. **components/GetFormItems.tsx** - 表单项定义
   - 参考: `src/modules/game/views/GameGroup/components/GetFormItems.tsx`
   - 定义新增/编辑表单的字段

### 3. 待创建的页面列表

根据API文档,还需创建以下页面:

1. **GameGroupConfig** - 群组配置管理
   - 需要额外的钱包变更相关功能
   - 参考字段: wallet_address, bet_amount, platform_fee_rate等

2. **GameGroupConfigLog** - 配置变更日志
   - 只读列表,无需Form.vue
   - 显示配置变更历史

3. **PlayerWalletBinding** - 玩家钱包绑定
   - 需要批量导入功能
   - 参考字段: tg_user_id, wallet_address等

4. **PlayerWalletBindingLog** - 钱包绑定日志
   - 只读列表,无需Form.vue

5. **SnakeNode** - 蛇身节点
   - 需要多个视图: 活跃节点、按周期查看、按玩家查看
   - 参考字段: ticket_number, player_address等

6. **PrizeRecord** - 中奖记录
   - 需要查看统计数据功能
   - 需要重新处理功能
   - 参考字段: prize_serial_no, prize_amount等

7. **PrizeTransfer** - 中奖转账
   - 需要重试、批量重试功能
   - 参考字段: to_address, tx_hash, status等

8. **DispatchQueue** - 派奖队列
   - 需要重试、批量重试功能
   - 参考字段: priority, status, retry_count等

9. **TronTransactionLog** - TRON交易日志
   - 需要同步区块链交易功能
   - 参考字段: tx_hash, from_address, to_address等

10. **TelegramCommandMessage** - Telegram命令消息
    - 需要导出功能
    - 需要统计功能
    - 参考字段: command, message_text, is_success等

### 4. 关键注意事项

#### 权限代码规范
所有权限代码格式为: `tg_game:{模块}:{操作}`

示例:
```typescript
v-auth="['tg_game:group:create']"    // 创建权限
v-auth="['tg_game:group:update']"    // 更新权限
v-auth="['tg_game:group:delete']"    // 删除权限
```

#### API调用示例
```typescript
// 导入API
import { page, create, save, deleteByIds } from '~/game/api/GameGroup.ts'

// 列表查询
const options = ref<MaProTableOptions>({
  requestOptions: {
    api: page,  // 使用page函数
  },
})

// 新增
await create(model.value)

// 编辑
await save(model.value.id, model.value)

// 删除
await deleteByIds([id])
```

#### 国际化使用示例
```typescript
// 在组件中
const { globalTrans: t, localTrans: local } = useTrans()

// 使用全局翻译
t('crud.add')           // 新增
t('crud.edit')          // 编辑
t('crud.delete')        // 删除

// 使用模块本地翻译
local('gameGroup.index')              // 游戏群组
local('gameGroup.prize_pool_amount')  // 奖池金额
```

#### 表格列渲染示例
```tsx
// 普通文本列
{
  label: () => t('gameGroup.tg_chat_id'),
  prop: 'tg_chat_id',
  width: '150px',
}

// 标签列
{
  label: () => t('gameGroup.prize_pool_amount'),
  prop: 'prize_pool_amount',
  cellRenderTo: {
    name: 'nmCellEnhance',
    props: {
      type: 'tag',
      tagType: (row) => row.prize_pool_amount > 1000 ? 'success' : 'info',
      format: (row) => `${row.prize_pool_amount} TRX`,
    },
  },
}

// 开关列
{
  label: () => t('gameGroup.status'),
  cellRenderTo: {
    name: 'nmCellEnhance',
    props: {
      type: 'switch',
      prop: 'status',
      props: {
        activeValue: 1,
        inactiveValue: 2,
        on: {
          change: (value, row, proxy) => {
            // 处理状态变更
          },
        },
      },
    },
  },
}
```

## 开发步骤建议

1. 先完成核心页面 (GameGroupConfig, SnakeNode, PrizeRecord)
2. 再完成辅助页面 (各种Log和Transfer)
3. 最后完成工具页面 (统计、导出等)

## 技术栈

- Vue 3 + TypeScript
- Element Plus - UI组件库
- MineAdmin Pro Table - 高级表格组件
- MineAdmin Form - 高级表单组件
- Pinia - 状态管理
- Vue I18n - 国际化

## 相关文档

- 需求文档: `/需求文档.md`
- API文档: `/GAME_API_DOCUMENTATION.md`
- 项目说明: `/CLAUDE.md`
