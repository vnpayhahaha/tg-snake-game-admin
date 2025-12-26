/*
 贪吃蛇游戏后台管理菜单SQL

 创建时间: 2025-12-26
 模块说明: Telegram贪吃蛇游戏管理系统菜单
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- 贪吃蛇游戏菜单数据
-- 说明：ID从500开始，避免与现有菜单冲突
-- ----------------------------

BEGIN;

-- ========================================
-- 1. 顶级菜单：贪吃蛇游戏
-- ========================================
INSERT INTO `menu` (`id`, `parent_id`, `name`, `meta`, `path`, `component`, `redirect`, `status`, `sort`, `created_by`, `updated_by`, `created_at`, `updated_at`, `remark`)
VALUES (500, 0, 'tg_game', '{"i18n": "tgGame.index", "icon": "mdi:snake", "type": "M", "affix": false, "cache": true, "title": "贪吃蛇游戏", "hidden": false, "copyright": true, "componentPath": "modules/", "componentSuffix": ".vue", "breadcrumbEnable": true}', '/tg_game', '', '', 1, 0, 1, 1, NOW(), NOW(), '贪吃蛇游戏管理');

-- ========================================
-- 2. 游戏群组管理
-- ========================================
INSERT INTO `menu` (`id`, `parent_id`, `name`, `meta`, `path`, `component`, `redirect`, `status`, `sort`, `created_by`, `updated_by`, `created_at`, `updated_at`, `remark`)
VALUES (501, 500, 'tg_game:group', '{"i18n": "tgGame.group.index", "icon": "mdi:google-circles-communities", "type": "M", "affix": false, "cache": true, "title": "游戏群组", "hidden": false, "copyright": true, "componentPath": "modules/", "componentSuffix": ".vue", "breadcrumbEnable": true}', '/tg_game/group', 'game/views/GameGroup/Index', '', 1, 1, 1, 1, NOW(), NOW(), '游戏群组管理');

-- 游戏群组权限按钮
INSERT INTO `menu` (`id`, `parent_id`, `name`, `meta`, `path`, `component`, `redirect`, `status`, `sort`, `created_by`, `updated_by`, `created_at`, `updated_at`, `remark`)
VALUES (502, 501, 'tg_game:group:list', '{"i18n": "tgGame.group.list", "type": "B", "title": "游戏群组列表"}', '', '', '', 1, 0, 1, 1, NOW(), NOW(), '');

INSERT INTO `menu` (`id`, `parent_id`, `name`, `meta`, `path`, `component`, `redirect`, `status`, `sort`, `created_by`, `updated_by`, `created_at`, `updated_at`, `remark`)
VALUES (503, 501, 'tg_game:group:detail', '{"i18n": "tgGame.group.detail", "type": "B", "title": "游戏群组详情"}', '', '', '', 1, 0, 1, 1, NOW(), NOW(), '');

INSERT INTO `menu` (`id`, `parent_id`, `name`, `meta`, `path`, `component`, `redirect`, `status`, `sort`, `created_by`, `updated_by`, `created_at`, `updated_at`, `remark`)
VALUES (504, 501, 'tg_game:group:statistics', '{"i18n": "tgGame.group.statistics", "type": "B", "title": "游戏群组统计"}', '', '', '', 1, 0, 1, 1, NOW(), NOW(), '');

INSERT INTO `menu` (`id`, `parent_id`, `name`, `meta`, `path`, `component`, `redirect`, `status`, `sort`, `created_by`, `updated_by`, `created_at`, `updated_at`, `remark`)
VALUES (505, 501, 'tg_game:group:snake', '{"i18n": "tgGame.group.snake", "type": "B", "title": "查看当前蛇身"}', '', '', '', 1, 0, 1, 1, NOW(), NOW(), '');

INSERT INTO `menu` (`id`, `parent_id`, `name`, `meta`, `path`, `component`, `redirect`, `status`, `sort`, `created_by`, `updated_by`, `created_at`, `updated_at`, `remark`)
VALUES (506, 501, 'tg_game:group:create', '{"i18n": "tgGame.group.create", "type": "B", "title": "游戏群组新增"}', '', '', '', 1, 0, 1, 1, NOW(), NOW(), '');

INSERT INTO `menu` (`id`, `parent_id`, `name`, `meta`, `path`, `component`, `redirect`, `status`, `sort`, `created_by`, `updated_by`, `created_at`, `updated_at`, `remark`)
VALUES (507, 501, 'tg_game:group:update', '{"i18n": "tgGame.group.update", "type": "B", "title": "游戏群组编辑"}', '', '', '', 1, 0, 1, 1, NOW(), NOW(), '');

INSERT INTO `menu` (`id`, `parent_id`, `name`, `meta`, `path`, `component`, `redirect`, `status`, `sort`, `created_by`, `updated_by`, `created_at`, `updated_at`, `remark`)
VALUES (508, 501, 'tg_game:group:resetPrizePool', '{"i18n": "tgGame.group.resetPrizePool", "type": "B", "title": "重置奖池"}', '', '', '', 1, 0, 1, 1, NOW(), NOW(), '');

INSERT INTO `menu` (`id`, `parent_id`, `name`, `meta`, `path`, `component`, `redirect`, `status`, `sort`, `created_by`, `updated_by`, `created_at`, `updated_at`, `remark`)
VALUES (509, 501, 'tg_game:group:delete', '{"i18n": "tgGame.group.delete", "type": "B", "title": "游戏群组删除"}', '', '', '', 1, 0, 1, 1, NOW(), NOW(), '');

-- ========================================
-- 3. 群组配置管理
-- ========================================
INSERT INTO `menu` (`id`, `parent_id`, `name`, `meta`, `path`, `component`, `redirect`, `status`, `sort`, `created_by`, `updated_by`, `created_at`, `updated_at`, `remark`)
VALUES (510, 500, 'tg_game:config', '{"i18n": "tgGame.config.index", "icon": "mdi:cog-outline", "type": "M", "affix": false, "cache": true, "title": "群组配置", "hidden": false, "copyright": true, "componentPath": "modules/", "componentSuffix": ".vue", "breadcrumbEnable": true}', '/tg_game/config', 'game/views/GameGroupConfig/Index', '', 1, 2, 1, 1, NOW(), NOW(), '群组配置管理');

-- 群组配置权限按钮
INSERT INTO `menu` (`id`, `parent_id`, `name`, `meta`, `path`, `component`, `redirect`, `status`, `sort`, `created_by`, `updated_by`, `created_at`, `updated_at`, `remark`)
VALUES (511, 510, 'tg_game:config:list', '{"i18n": "tgGame.config.list", "type": "B", "title": "群组配置列表"}', '', '', '', 1, 0, 1, 1, NOW(), NOW(), '');

INSERT INTO `menu` (`id`, `parent_id`, `name`, `meta`, `path`, `component`, `redirect`, `status`, `sort`, `created_by`, `updated_by`, `created_at`, `updated_at`, `remark`)
VALUES (512, 510, 'tg_game:config:detail', '{"i18n": "tgGame.config.detail", "type": "B", "title": "配置详情"}', '', '', '', 1, 0, 1, 1, NOW(), NOW(), '');

INSERT INTO `menu` (`id`, `parent_id`, `name`, `meta`, `path`, `component`, `redirect`, `status`, `sort`, `created_by`, `updated_by`, `created_at`, `updated_at`, `remark`)
VALUES (513, 510, 'tg_game:config:create', '{"i18n": "tgGame.config.create", "type": "B", "title": "配置新增"}', '', '', '', 1, 0, 1, 1, NOW(), NOW(), '');

INSERT INTO `menu` (`id`, `parent_id`, `name`, `meta`, `path`, `component`, `redirect`, `status`, `sort`, `created_by`, `updated_by`, `created_at`, `updated_at`, `remark`)
VALUES (514, 510, 'tg_game:config:update', '{"i18n": "tgGame.config.update", "type": "B", "title": "配置编辑"}', '', '', '', 1, 0, 1, 1, NOW(), NOW(), '');

INSERT INTO `menu` (`id`, `parent_id`, `name`, `meta`, `path`, `component`, `redirect`, `status`, `sort`, `created_by`, `updated_by`, `created_at`, `updated_at`, `remark`)
VALUES (515, 510, 'tg_game:config:delete', '{"i18n": "tgGame.config.delete", "type": "B", "title": "配置删除"}', '', '', '', 1, 0, 1, 1, NOW(), NOW(), '');

INSERT INTO `menu` (`id`, `parent_id`, `name`, `meta`, `path`, `component`, `redirect`, `status`, `sort`, `created_by`, `updated_by`, `created_at`, `updated_at`, `remark`)
VALUES (516, 510, 'tg_game:config:startWalletChange', '{"i18n": "tgGame.config.startWalletChange", "type": "B", "title": "开始钱包变更"}', '', '', '', 1, 0, 1, 1, NOW(), NOW(), '');

INSERT INTO `menu` (`id`, `parent_id`, `name`, `meta`, `path`, `component`, `redirect`, `status`, `sort`, `created_by`, `updated_by`, `created_at`, `updated_at`, `remark`)
VALUES (517, 510, 'tg_game:config:cancelWalletChange', '{"i18n": "tgGame.config.cancelWalletChange", "type": "B", "title": "取消钱包变更"}', '', '', '', 1, 0, 1, 1, NOW(), NOW(), '');

INSERT INTO `menu` (`id`, `parent_id`, `name`, `meta`, `path`, `component`, `redirect`, `status`, `sort`, `created_by`, `updated_by`, `created_at`, `updated_at`, `remark`)
VALUES (518, 510, 'tg_game:config:completeWalletChange', '{"i18n": "tgGame.config.completeWalletChange", "type": "B", "title": "完成钱包变更"}', '', '', '', 1, 0, 1, 1, NOW(), NOW(), '');

-- ========================================
-- 4. 配置变更日志
-- ========================================
INSERT INTO `menu` (`id`, `parent_id`, `name`, `meta`, `path`, `component`, `redirect`, `status`, `sort`, `created_by`, `updated_by`, `created_at`, `updated_at`, `remark`)
VALUES (520, 500, 'tg_game:config_log', '{"i18n": "tgGame.configLog.index", "icon": "mdi:text-box-outline", "type": "M", "affix": false, "cache": true, "title": "配置变更日志", "hidden": false, "copyright": true, "componentPath": "modules/", "componentSuffix": ".vue", "breadcrumbEnable": true}', '/tg_game/config_log', 'game/views/GameGroupConfigLog/Index', '', 1, 3, 1, 1, NOW(), NOW(), '配置变更日志');

-- 配置变更日志权限按钮
INSERT INTO `menu` (`id`, `parent_id`, `name`, `meta`, `path`, `component`, `redirect`, `status`, `sort`, `created_by`, `updated_by`, `created_at`, `updated_at`, `remark`)
VALUES (521, 520, 'tg_game:config_log:list', '{"i18n": "tgGame.configLog.list", "type": "B", "title": "变更日志列表"}', '', '', '', 1, 0, 1, 1, NOW(), NOW(), '');

INSERT INTO `menu` (`id`, `parent_id`, `name`, `meta`, `path`, `component`, `redirect`, `status`, `sort`, `created_by`, `updated_by`, `created_at`, `updated_at`, `remark`)
VALUES (522, 520, 'tg_game:config_log:byConfig', '{"i18n": "tgGame.configLog.byConfig", "type": "B", "title": "按配置查询"}', '', '', '', 1, 0, 1, 1, NOW(), NOW(), '');

INSERT INTO `menu` (`id`, `parent_id`, `name`, `meta`, `path`, `component`, `redirect`, `status`, `sort`, `created_by`, `updated_by`, `created_at`, `updated_at`, `remark`)
VALUES (523, 520, 'tg_game:config_log:walletChanges', '{"i18n": "tgGame.configLog.walletChanges", "type": "B", "title": "钱包变更历史"}', '', '', '', 1, 0, 1, 1, NOW(), NOW(), '');

-- ========================================
-- 5. 玩家钱包绑定
-- ========================================
INSERT INTO `menu` (`id`, `parent_id`, `name`, `meta`, `path`, `component`, `redirect`, `status`, `sort`, `created_by`, `updated_by`, `created_at`, `updated_at`, `remark`)
VALUES (530, 500, 'tg_game:wallet_binding', '{"i18n": "tgGame.walletBinding.index", "icon": "mdi:wallet-outline", "type": "M", "affix": false, "cache": true, "title": "玩家钱包绑定", "hidden": false, "copyright": true, "componentPath": "modules/", "componentSuffix": ".vue", "breadcrumbEnable": true}', '/tg_game/wallet_binding', 'game/views/PlayerWalletBinding/Index', '', 1, 4, 1, 1, NOW(), NOW(), '玩家钱包绑定');

-- 玩家钱包绑定权限按钮
INSERT INTO `menu` (`id`, `parent_id`, `name`, `meta`, `path`, `component`, `redirect`, `status`, `sort`, `created_by`, `updated_by`, `created_at`, `updated_at`, `remark`)
VALUES (531, 530, 'tg_game:wallet_binding:list', '{"i18n": "tgGame.walletBinding.list", "type": "B", "title": "钱包绑定列表"}', '', '', '', 1, 0, 1, 1, NOW(), NOW(), '');

INSERT INTO `menu` (`id`, `parent_id`, `name`, `meta`, `path`, `component`, `redirect`, `status`, `sort`, `created_by`, `updated_by`, `created_at`, `updated_at`, `remark`)
VALUES (532, 530, 'tg_game:wallet_binding:byTgUser', '{"i18n": "tgGame.walletBinding.byTgUser", "type": "B", "title": "按用户查询"}', '', '', '', 1, 0, 1, 1, NOW(), NOW(), '');

INSERT INTO `menu` (`id`, `parent_id`, `name`, `meta`, `path`, `component`, `redirect`, `status`, `sort`, `created_by`, `updated_by`, `created_at`, `updated_at`, `remark`)
VALUES (533, 530, 'tg_game:wallet_binding:create', '{"i18n": "tgGame.walletBinding.create", "type": "B", "title": "绑定新增"}', '', '', '', 1, 0, 1, 1, NOW(), NOW(), '');

INSERT INTO `menu` (`id`, `parent_id`, `name`, `meta`, `path`, `component`, `redirect`, `status`, `sort`, `created_by`, `updated_by`, `created_at`, `updated_at`, `remark`)
VALUES (534, 530, 'tg_game:wallet_binding:batchImport', '{"i18n": "tgGame.walletBinding.batchImport", "type": "B", "title": "批量导入"}', '', '', '', 1, 0, 1, 1, NOW(), NOW(), '');

INSERT INTO `menu` (`id`, `parent_id`, `name`, `meta`, `path`, `component`, `redirect`, `status`, `sort`, `created_by`, `updated_by`, `created_at`, `updated_at`, `remark`)
VALUES (535, 530, 'tg_game:wallet_binding:unbind', '{"i18n": "tgGame.walletBinding.unbind", "type": "B", "title": "解除绑定"}', '', '', '', 1, 0, 1, 1, NOW(), NOW(), '');

-- ========================================
-- 6. 钱包绑定日志
-- ========================================
INSERT INTO `menu` (`id`, `parent_id`, `name`, `meta`, `path`, `component`, `redirect`, `status`, `sort`, `created_by`, `updated_by`, `created_at`, `updated_at`, `remark`)
VALUES (540, 500, 'tg_game:wallet_binding_log', '{"i18n": "tgGame.walletBindingLog.index", "icon": "mdi:text-box-check-outline", "type": "M", "affix": false, "cache": true, "title": "钱包绑定日志", "hidden": false, "copyright": true, "componentPath": "modules/", "componentSuffix": ".vue", "breadcrumbEnable": true}', '/tg_game/wallet_binding_log', 'game/views/PlayerWalletBindingLog/Index', '', 1, 5, 1, 1, NOW(), NOW(), '钱包绑定日志');

-- 钱包绑定日志权限按钮
INSERT INTO `menu` (`id`, `parent_id`, `name`, `meta`, `path`, `component`, `redirect`, `status`, `sort`, `created_by`, `updated_by`, `created_at`, `updated_at`, `remark`)
VALUES (541, 540, 'tg_game:wallet_binding_log:list', '{"i18n": "tgGame.walletBindingLog.list", "type": "B", "title": "绑定日志列表"}', '', '', '', 1, 0, 1, 1, NOW(), NOW(), '');

INSERT INTO `menu` (`id`, `parent_id`, `name`, `meta`, `path`, `component`, `redirect`, `status`, `sort`, `created_by`, `updated_by`, `created_at`, `updated_at`, `remark`)
VALUES (542, 540, 'tg_game:wallet_binding_log:byUser', '{"i18n": "tgGame.walletBindingLog.byUser", "type": "B", "title": "按用户查询"}', '', '', '', 1, 0, 1, 1, NOW(), NOW(), '');

-- ========================================
-- 7. 蛇身节点管理
-- ========================================
INSERT INTO `menu` (`id`, `parent_id`, `name`, `meta`, `path`, `component`, `redirect`, `status`, `sort`, `created_by`, `updated_by`, `created_at`, `updated_at`, `remark`)
VALUES (550, 500, 'tg_game:snake_node', '{"i18n": "tgGame.snakeNode.index", "icon": "mdi:dots-horizontal-circle-outline", "type": "M", "affix": false, "cache": true, "title": "蛇身节点", "hidden": false, "copyright": true, "componentPath": "modules/", "componentSuffix": ".vue", "breadcrumbEnable": true}', '/tg_game/snake_node', 'game/views/SnakeNode/Index', '', 1, 6, 1, 1, NOW(), NOW(), '蛇身节点管理');

-- 蛇身节点权限按钮
INSERT INTO `menu` (`id`, `parent_id`, `name`, `meta`, `path`, `component`, `redirect`, `status`, `sort`, `created_by`, `updated_by`, `created_at`, `updated_at`, `remark`)
VALUES (551, 550, 'tg_game:snake_node:list', '{"i18n": "tgGame.snakeNode.list", "type": "B", "title": "节点列表"}', '', '', '', 1, 0, 1, 1, NOW(), NOW(), '');

INSERT INTO `menu` (`id`, `parent_id`, `name`, `meta`, `path`, `component`, `redirect`, `status`, `sort`, `created_by`, `updated_by`, `created_at`, `updated_at`, `remark`)
VALUES (552, 550, 'tg_game:snake_node:active', '{"i18n": "tgGame.snakeNode.active", "type": "B", "title": "活跃节点"}', '', '', '', 1, 0, 1, 1, NOW(), NOW(), '');

INSERT INTO `menu` (`id`, `parent_id`, `name`, `meta`, `path`, `component`, `redirect`, `status`, `sort`, `created_by`, `updated_by`, `created_at`, `updated_at`, `remark`)
VALUES (553, 550, 'tg_game:snake_node:byWalletCycle', '{"i18n": "tgGame.snakeNode.byWalletCycle", "type": "B", "title": "按钱包周期查询"}', '', '', '', 1, 0, 1, 1, NOW(), NOW(), '');

INSERT INTO `menu` (`id`, `parent_id`, `name`, `meta`, `path`, `component`, `redirect`, `status`, `sort`, `created_by`, `updated_by`, `created_at`, `updated_at`, `remark`)
VALUES (554, 550, 'tg_game:snake_node:byPlayer', '{"i18n": "tgGame.snakeNode.byPlayer", "type": "B", "title": "按玩家查询"}', '', '', '', 1, 0, 1, 1, NOW(), NOW(), '');

INSERT INTO `menu` (`id`, `parent_id`, `name`, `meta`, `path`, `component`, `redirect`, `status`, `sort`, `created_by`, `updated_by`, `created_at`, `updated_at`, `remark`)
VALUES (555, 550, 'tg_game:snake_node:byTxHash', '{"i18n": "tgGame.snakeNode.byTxHash", "type": "B", "title": "按交易哈希查询"}', '', '', '', 1, 0, 1, 1, NOW(), NOW(), '');

INSERT INTO `menu` (`id`, `parent_id`, `name`, `meta`, `path`, `component`, `redirect`, `status`, `sort`, `created_by`, `updated_by`, `created_at`, `updated_at`, `remark`)
VALUES (556, 550, 'tg_game:snake_node:dailyStatistics', '{"i18n": "tgGame.snakeNode.dailyStatistics", "type": "B", "title": "当日统计"}', '', '', '', 1, 0, 1, 1, NOW(), NOW(), '');

INSERT INTO `menu` (`id`, `parent_id`, `name`, `meta`, `path`, `component`, `redirect`, `status`, `sort`, `created_by`, `updated_by`, `created_at`, `updated_at`, `remark`)
VALUES (557, 550, 'tg_game:snake_node:archive', '{"i18n": "tgGame.snakeNode.archive", "type": "B", "title": "归档节点"}', '', '', '', 1, 0, 1, 1, NOW(), NOW(), '');

INSERT INTO `menu` (`id`, `parent_id`, `name`, `meta`, `path`, `component`, `redirect`, `status`, `sort`, `created_by`, `updated_by`, `created_at`, `updated_at`, `remark`)
VALUES (558, 550, 'tg_game:snake_node:updateStatus', '{"i18n": "tgGame.snakeNode.updateStatus", "type": "B", "title": "更新状态"}', '', '', '', 1, 0, 1, 1, NOW(), NOW(), '');

-- ========================================
-- 8. 中奖记录管理
-- ========================================
INSERT INTO `menu` (`id`, `parent_id`, `name`, `meta`, `path`, `component`, `redirect`, `status`, `sort`, `created_by`, `updated_by`, `created_at`, `updated_at`, `remark`)
VALUES (560, 500, 'tg_game:prize', '{"i18n": "tgGame.prize.index", "icon": "mdi:trophy-outline", "type": "M", "affix": false, "cache": true, "title": "中奖记录", "hidden": false, "copyright": true, "componentPath": "modules/", "componentSuffix": ".vue", "breadcrumbEnable": true}', '/tg_game/prize', 'game/views/PrizeRecord/Index', '', 1, 7, 1, 1, NOW(), NOW(), '中奖记录管理');

-- 中奖记录权限按钮
INSERT INTO `menu` (`id`, `parent_id`, `name`, `meta`, `path`, `component`, `redirect`, `status`, `sort`, `created_by`, `updated_by`, `created_at`, `updated_at`, `remark`)
VALUES (561, 560, 'tg_game:prize:list', '{"i18n": "tgGame.prize.list", "type": "B", "title": "中奖记录列表"}', '', '', '', 1, 0, 1, 1, NOW(), NOW(), '');

INSERT INTO `menu` (`id`, `parent_id`, `name`, `meta`, `path`, `component`, `redirect`, `status`, `sort`, `created_by`, `updated_by`, `created_at`, `updated_at`, `remark`)
VALUES (562, 560, 'tg_game:prize:detail', '{"i18n": "tgGame.prize.detail", "type": "B", "title": "中奖详情"}', '', '', '', 1, 0, 1, 1, NOW(), NOW(), '');

INSERT INTO `menu` (`id`, `parent_id`, `name`, `meta`, `path`, `component`, `redirect`, `status`, `sort`, `created_by`, `updated_by`, `created_at`, `updated_at`, `remark`)
VALUES (563, 560, 'tg_game:prize:bySerial', '{"i18n": "tgGame.prize.bySerial", "type": "B", "title": "按流水号查询"}', '', '', '', 1, 0, 1, 1, NOW(), NOW(), '');

INSERT INTO `menu` (`id`, `parent_id`, `name`, `meta`, `path`, `component`, `redirect`, `status`, `sort`, `created_by`, `updated_by`, `created_at`, `updated_at`, `remark`)
VALUES (564, 560, 'tg_game:prize:byGroup', '{"i18n": "tgGame.prize.byGroup", "type": "B", "title": "按群组查询"}', '', '', '', 1, 0, 1, 1, NOW(), NOW(), '');

INSERT INTO `menu` (`id`, `parent_id`, `name`, `meta`, `path`, `component`, `redirect`, `status`, `sort`, `created_by`, `updated_by`, `created_at`, `updated_at`, `remark`)
VALUES (565, 560, 'tg_game:prize:statistics', '{"i18n": "tgGame.prize.statistics", "type": "B", "title": "中奖统计"}', '', '', '', 1, 0, 1, 1, NOW(), NOW(), '');

INSERT INTO `menu` (`id`, `parent_id`, `name`, `meta`, `path`, `component`, `redirect`, `status`, `sort`, `created_by`, `updated_by`, `created_at`, `updated_at`, `remark`)
VALUES (566, 560, 'tg_game:prize:transfers', '{"i18n": "tgGame.prize.transfers", "type": "B", "title": "查看转账详情"}', '', '', '', 1, 0, 1, 1, NOW(), NOW(), '');

INSERT INTO `menu` (`id`, `parent_id`, `name`, `meta`, `path`, `component`, `redirect`, `status`, `sort`, `created_by`, `updated_by`, `created_at`, `updated_at`, `remark`)
VALUES (567, 560, 'tg_game:prize:reprocess', '{"i18n": "tgGame.prize.reprocess", "type": "B", "title": "重新处理"}', '', '', '', 1, 0, 1, 1, NOW(), NOW(), '');

INSERT INTO `menu` (`id`, `parent_id`, `name`, `meta`, `path`, `component`, `redirect`, `status`, `sort`, `created_by`, `updated_by`, `created_at`, `updated_at`, `remark`)
VALUES (568, 560, 'tg_game:prize:updateStatus', '{"i18n": "tgGame.prize.updateStatus", "type": "B", "title": "更新状态"}', '', '', '', 1, 0, 1, 1, NOW(), NOW(), '');

-- ========================================
-- 9. 中奖转账管理
-- ========================================
INSERT INTO `menu` (`id`, `parent_id`, `name`, `meta`, `path`, `component`, `redirect`, `status`, `sort`, `created_by`, `updated_by`, `created_at`, `updated_at`, `remark`)
VALUES (570, 500, 'tg_game:prize_transfer', '{"i18n": "tgGame.prizeTransfer.index", "icon": "mdi:bank-transfer", "type": "M", "affix": false, "cache": true, "title": "中奖转账", "hidden": false, "copyright": true, "componentPath": "modules/", "componentSuffix": ".vue", "breadcrumbEnable": true}', '/tg_game/prize_transfer', 'game/views/PrizeTransfer/Index', '', 1, 8, 1, 1, NOW(), NOW(), '中奖转账管理');

-- 中奖转账权限按钮
INSERT INTO `menu` (`id`, `parent_id`, `name`, `meta`, `path`, `component`, `redirect`, `status`, `sort`, `created_by`, `updated_by`, `created_at`, `updated_at`, `remark`)
VALUES (571, 570, 'tg_game:prize_transfer:list', '{"i18n": "tgGame.prizeTransfer.list", "type": "B", "title": "转账列表"}', '', '', '', 1, 0, 1, 1, NOW(), NOW(), '');

INSERT INTO `menu` (`id`, `parent_id`, `name`, `meta`, `path`, `component`, `redirect`, `status`, `sort`, `created_by`, `updated_by`, `created_at`, `updated_at`, `remark`)
VALUES (572, 570, 'tg_game:prize_transfer:pending', '{"i18n": "tgGame.prizeTransfer.pending", "type": "B", "title": "待处理转账"}', '', '', '', 1, 0, 1, 1, NOW(), NOW(), '');

INSERT INTO `menu` (`id`, `parent_id`, `name`, `meta`, `path`, `component`, `redirect`, `status`, `sort`, `created_by`, `updated_by`, `created_at`, `updated_at`, `remark`)
VALUES (573, 570, 'tg_game:prize_transfer:failed', '{"i18n": "tgGame.prizeTransfer.failed", "type": "B", "title": "失败转账"}', '', '', '', 1, 0, 1, 1, NOW(), NOW(), '');

INSERT INTO `menu` (`id`, `parent_id`, `name`, `meta`, `path`, `component`, `redirect`, `status`, `sort`, `created_by`, `updated_by`, `created_at`, `updated_at`, `remark`)
VALUES (574, 570, 'tg_game:prize_transfer:byPrize', '{"i18n": "tgGame.prizeTransfer.byPrize", "type": "B", "title": "按中奖记录查询"}', '', '', '', 1, 0, 1, 1, NOW(), NOW(), '');

INSERT INTO `menu` (`id`, `parent_id`, `name`, `meta`, `path`, `component`, `redirect`, `status`, `sort`, `created_by`, `updated_by`, `created_at`, `updated_at`, `remark`)
VALUES (575, 570, 'tg_game:prize_transfer:byTxHash', '{"i18n": "tgGame.prizeTransfer.byTxHash", "type": "B", "title": "按交易哈希查询"}', '', '', '', 1, 0, 1, 1, NOW(), NOW(), '');

INSERT INTO `menu` (`id`, `parent_id`, `name`, `meta`, `path`, `component`, `redirect`, `status`, `sort`, `created_by`, `updated_by`, `created_at`, `updated_at`, `remark`)
VALUES (576, 570, 'tg_game:prize_transfer:retry', '{"i18n": "tgGame.prizeTransfer.retry", "type": "B", "title": "重试转账"}', '', '', '', 1, 0, 1, 1, NOW(), NOW(), '');

INSERT INTO `menu` (`id`, `parent_id`, `name`, `meta`, `path`, `component`, `redirect`, `status`, `sort`, `created_by`, `updated_by`, `created_at`, `updated_at`, `remark`)
VALUES (577, 570, 'tg_game:prize_transfer:batchRetry', '{"i18n": "tgGame.prizeTransfer.batchRetry", "type": "B", "title": "批量重试"}', '', '', '', 1, 0, 1, 1, NOW(), NOW(), '');

INSERT INTO `menu` (`id`, `parent_id`, `name`, `meta`, `path`, `component`, `redirect`, `status`, `sort`, `created_by`, `updated_by`, `created_at`, `updated_at`, `remark`)
VALUES (578, 570, 'tg_game:prize_transfer:markSuccess', '{"i18n": "tgGame.prizeTransfer.markSuccess", "type": "B", "title": "标记为成功"}', '', '', '', 1, 0, 1, 1, NOW(), NOW(), '');

INSERT INTO `menu` (`id`, `parent_id`, `name`, `meta`, `path`, `component`, `redirect`, `status`, `sort`, `created_by`, `updated_by`, `created_at`, `updated_at`, `remark`)
VALUES (579, 570, 'tg_game:prize_transfer:updateStatus', '{"i18n": "tgGame.prizeTransfer.updateStatus", "type": "B", "title": "更新状态"}', '', '', '', 1, 0, 1, 1, NOW(), NOW(), '');

-- ========================================
-- 10. 派奖队列管理
-- ========================================
INSERT INTO `menu` (`id`, `parent_id`, `name`, `meta`, `path`, `component`, `redirect`, `status`, `sort`, `created_by`, `updated_by`, `created_at`, `updated_at`, `remark`)
VALUES (580, 500, 'tg_game:dispatch_queue', '{"i18n": "tgGame.dispatchQueue.index", "icon": "mdi:format-list-checkbox", "type": "M", "affix": false, "cache": true, "title": "派奖队列", "hidden": false, "copyright": true, "componentPath": "modules/", "componentSuffix": ".vue", "breadcrumbEnable": true}', '/tg_game/dispatch_queue', 'game/views/DispatchQueue/Index', '', 1, 9, 1, 1, NOW(), NOW(), '派奖队列管理');

-- 派奖队列权限按钮
INSERT INTO `menu` (`id`, `parent_id`, `name`, `meta`, `path`, `component`, `redirect`, `status`, `sort`, `created_by`, `updated_by`, `created_at`, `updated_at`, `remark`)
VALUES (581, 580, 'tg_game:dispatch_queue:list', '{"i18n": "tgGame.dispatchQueue.list", "type": "B", "title": "队列列表"}', '', '', '', 1, 0, 1, 1, NOW(), NOW(), '');

INSERT INTO `menu` (`id`, `parent_id`, `name`, `meta`, `path`, `component`, `redirect`, `status`, `sort`, `created_by`, `updated_by`, `created_at`, `updated_at`, `remark`)
VALUES (582, 580, 'tg_game:dispatch_queue:pending', '{"i18n": "tgGame.dispatchQueue.pending", "type": "B", "title": "待处理队列"}', '', '', '', 1, 0, 1, 1, NOW(), NOW(), '');

INSERT INTO `menu` (`id`, `parent_id`, `name`, `meta`, `path`, `component`, `redirect`, `status`, `sort`, `created_by`, `updated_by`, `created_at`, `updated_at`, `remark`)
VALUES (583, 580, 'tg_game:dispatch_queue:failed', '{"i18n": "tgGame.dispatchQueue.failed", "type": "B", "title": "失败队列"}', '', '', '', 1, 0, 1, 1, NOW(), NOW(), '');

INSERT INTO `menu` (`id`, `parent_id`, `name`, `meta`, `path`, `component`, `redirect`, `status`, `sort`, `created_by`, `updated_by`, `created_at`, `updated_at`, `remark`)
VALUES (584, 580, 'tg_game:dispatch_queue:byPrize', '{"i18n": "tgGame.dispatchQueue.byPrize", "type": "B", "title": "按中奖记录查询"}', '', '', '', 1, 0, 1, 1, NOW(), NOW(), '');

INSERT INTO `menu` (`id`, `parent_id`, `name`, `meta`, `path`, `component`, `redirect`, `status`, `sort`, `created_by`, `updated_by`, `created_at`, `updated_at`, `remark`)
VALUES (585, 580, 'tg_game:dispatch_queue:retry', '{"i18n": "tgGame.dispatchQueue.retry", "type": "B", "title": "重试派发"}', '', '', '', 1, 0, 1, 1, NOW(), NOW(), '');

INSERT INTO `menu` (`id`, `parent_id`, `name`, `meta`, `path`, `component`, `redirect`, `status`, `sort`, `created_by`, `updated_by`, `created_at`, `updated_at`, `remark`)
VALUES (586, 580, 'tg_game:dispatch_queue:batchRetry', '{"i18n": "tgGame.dispatchQueue.batchRetry", "type": "B", "title": "批量重试"}', '', '', '', 1, 0, 1, 1, NOW(), NOW(), '');

INSERT INTO `menu` (`id`, `parent_id`, `name`, `meta`, `path`, `component`, `redirect`, `status`, `sort`, `created_by`, `updated_by`, `created_at`, `updated_at`, `remark`)
VALUES (587, 580, 'tg_game:dispatch_queue:markSuccess', '{"i18n": "tgGame.dispatchQueue.markSuccess", "type": "B", "title": "标记为成功"}', '', '', '', 1, 0, 1, 1, NOW(), NOW(), '');

-- ========================================
-- 11. TRON交易日志
-- ========================================
INSERT INTO `menu` (`id`, `parent_id`, `name`, `meta`, `path`, `component`, `redirect`, `status`, `sort`, `created_by`, `updated_by`, `created_at`, `updated_at`, `remark`)
VALUES (590, 500, 'tg_game:tron_log', '{"i18n": "tgGame.tronLog.index", "icon": "mdi:bitcoin", "type": "M", "affix": false, "cache": true, "title": "TRON交易日志", "hidden": false, "copyright": true, "componentPath": "modules/", "componentSuffix": ".vue", "breadcrumbEnable": true}', '/tg_game/tron_log', 'game/views/TronLog/Index', '', 1, 10, 1, 1, NOW(), NOW(), 'TRON交易日志');

-- TRON交易日志权限按钮
INSERT INTO `menu` (`id`, `parent_id`, `name`, `meta`, `path`, `component`, `redirect`, `status`, `sort`, `created_by`, `updated_by`, `created_at`, `updated_at`, `remark`)
VALUES (591, 590, 'tg_game:tron_log:list', '{"i18n": "tgGame.tronLog.list", "type": "B", "title": "交易日志列表"}', '', '', '', 1, 0, 1, 1, NOW(), NOW(), '');

INSERT INTO `menu` (`id`, `parent_id`, `name`, `meta`, `path`, `component`, `redirect`, `status`, `sort`, `created_by`, `updated_by`, `created_at`, `updated_at`, `remark`)
VALUES (592, 590, 'tg_game:tron_log:unprocessed', '{"i18n": "tgGame.tronLog.unprocessed", "type": "B", "title": "未处理交易"}', '', '', '', 1, 0, 1, 1, NOW(), NOW(), '');

INSERT INTO `menu` (`id`, `parent_id`, `name`, `meta`, `path`, `component`, `redirect`, `status`, `sort`, `created_by`, `updated_by`, `created_at`, `updated_at`, `remark`)
VALUES (593, 590, 'tg_game:tron_log:byGroup', '{"i18n": "tgGame.tronLog.byGroup", "type": "B", "title": "按群组查询"}', '', '', '', 1, 0, 1, 1, NOW(), NOW(), '');

INSERT INTO `menu` (`id`, `parent_id`, `name`, `meta`, `path`, `component`, `redirect`, `status`, `sort`, `created_by`, `updated_by`, `created_at`, `updated_at`, `remark`)
VALUES (594, 590, 'tg_game:tron_log:byTxHash', '{"i18n": "tgGame.tronLog.byTxHash", "type": "B", "title": "按交易哈希查询"}', '', '', '', 1, 0, 1, 1, NOW(), NOW(), '');

INSERT INTO `menu` (`id`, `parent_id`, `name`, `meta`, `path`, `component`, `redirect`, `status`, `sort`, `created_by`, `updated_by`, `created_at`, `updated_at`, `remark`)
VALUES (595, 590, 'tg_game:tron_log:byAddress', '{"i18n": "tgGame.tronLog.byAddress", "type": "B", "title": "按钱包地址查询"}', '', '', '', 1, 0, 1, 1, NOW(), NOW(), '');

INSERT INTO `menu` (`id`, `parent_id`, `name`, `meta`, `path`, `component`, `redirect`, `status`, `sort`, `created_by`, `updated_by`, `created_at`, `updated_at`, `remark`)
VALUES (596, 590, 'tg_game:tron_log:statistics', '{"i18n": "tgGame.tronLog.statistics", "type": "B", "title": "交易统计"}', '', '', '', 1, 0, 1, 1, NOW(), NOW(), '');

INSERT INTO `menu` (`id`, `parent_id`, `name`, `meta`, `path`, `component`, `redirect`, `status`, `sort`, `created_by`, `updated_by`, `created_at`, `updated_at`, `remark`)
VALUES (597, 590, 'tg_game:tron_log:reprocess', '{"i18n": "tgGame.tronLog.reprocess", "type": "B", "title": "重新处理"}', '', '', '', 1, 0, 1, 1, NOW(), NOW(), '');

INSERT INTO `menu` (`id`, `parent_id`, `name`, `meta`, `path`, `component`, `redirect`, `status`, `sort`, `created_by`, `updated_by`, `created_at`, `updated_at`, `remark`)
VALUES (598, 590, 'tg_game:tron_log:syncTransactions', '{"i18n": "tgGame.tronLog.syncTransactions", "type": "B", "title": "同步区块链交易"}', '', '', '', 1, 0, 1, 1, NOW(), NOW(), '');

-- ========================================
-- 12. Telegram命令消息记录
-- ========================================
INSERT INTO `menu` (`id`, `parent_id`, `name`, `meta`, `path`, `component`, `redirect`, `status`, `sort`, `created_by`, `updated_by`, `created_at`, `updated_at`, `remark`)
VALUES (600, 500, 'tg_game:command_message', '{"i18n": "tgGame.commandMessage.index", "icon": "mdi:message-text-outline", "type": "M", "affix": false, "cache": true, "title": "命令消息记录", "hidden": false, "copyright": true, "componentPath": "modules/", "componentSuffix": ".vue", "breadcrumbEnable": true}', '/tg_game/command_message', 'game/views/TelegramCommandMessage/Index', '', 1, 11, 1, 1, NOW(), NOW(), 'Telegram命令消息记录');

-- Telegram命令消息权限按钮
INSERT INTO `menu` (`id`, `parent_id`, `name`, `meta`, `path`, `component`, `redirect`, `status`, `sort`, `created_by`, `updated_by`, `created_at`, `updated_at`, `remark`)
VALUES (601, 600, 'tg_game:command_message:list', '{"i18n": "tgGame.commandMessage.list", "type": "B", "title": "消息记录列表"}', '', '', '', 1, 0, 1, 1, NOW(), NOW(), '');

INSERT INTO `menu` (`id`, `parent_id`, `name`, `meta`, `path`, `component`, `redirect`, `status`, `sort`, `created_by`, `updated_by`, `created_at`, `updated_at`, `remark`)
VALUES (602, 600, 'tg_game:command_message:detail', '{"i18n": "tgGame.commandMessage.detail", "type": "B", "title": "消息详情"}', '', '', '', 1, 0, 1, 1, NOW(), NOW(), '');

INSERT INTO `menu` (`id`, `parent_id`, `name`, `meta`, `path`, `component`, `redirect`, `status`, `sort`, `created_by`, `updated_by`, `created_at`, `updated_at`, `remark`)
VALUES (603, 600, 'tg_game:command_message:byGroup', '{"i18n": "tgGame.commandMessage.byGroup", "type": "B", "title": "按群组查询"}', '', '', '', 1, 0, 1, 1, NOW(), NOW(), '');

INSERT INTO `menu` (`id`, `parent_id`, `name`, `meta`, `path`, `component`, `redirect`, `status`, `sort`, `created_by`, `updated_by`, `created_at`, `updated_at`, `remark`)
VALUES (604, 600, 'tg_game:command_message:byUser', '{"i18n": "tgGame.commandMessage.byUser", "type": "B", "title": "按用户查询"}', '', '', '', 1, 0, 1, 1, NOW(), NOW(), '');

INSERT INTO `menu` (`id`, `parent_id`, `name`, `meta`, `path`, `component`, `redirect`, `status`, `sort`, `created_by`, `updated_by`, `created_at`, `updated_at`, `remark`)
VALUES (605, 600, 'tg_game:command_message:byCommand', '{"i18n": "tgGame.commandMessage.byCommand", "type": "B", "title": "按命令类型查询"}', '', '', '', 1, 0, 1, 1, NOW(), NOW(), '');

INSERT INTO `menu` (`id`, `parent_id`, `name`, `meta`, `path`, `component`, `redirect`, `status`, `sort`, `created_by`, `updated_by`, `created_at`, `updated_at`, `remark`)
VALUES (606, 600, 'tg_game:command_message:statistics', '{"i18n": "tgGame.commandMessage.statistics", "type": "B", "title": "消息统计"}', '', '', '', 1, 0, 1, 1, NOW(), NOW(), '');

INSERT INTO `menu` (`id`, `parent_id`, `name`, `meta`, `path`, `component`, `redirect`, `status`, `sort`, `created_by`, `updated_by`, `created_at`, `updated_at`, `remark`)
VALUES (607, 600, 'tg_game:command_message:dailyStatistics', '{"i18n": "tgGame.commandMessage.dailyStatistics", "type": "B", "title": "当日统计"}', '', '', '', 1, 0, 1, 1, NOW(), NOW(), '');

INSERT INTO `menu` (`id`, `parent_id`, `name`, `meta`, `path`, `component`, `redirect`, `status`, `sort`, `created_by`, `updated_by`, `created_at`, `updated_at`, `remark`)
VALUES (608, 600, 'tg_game:command_message:export', '{"i18n": "tgGame.commandMessage.export", "type": "B", "title": "导出记录"}', '', '', '', 1, 0, 1, 1, NOW(), NOW(), '');

INSERT INTO `menu` (`id`, `parent_id`, `name`, `meta`, `path`, `component`, `redirect`, `status`, `sort`, `created_by`, `updated_by`, `created_at`, `updated_at`, `remark`)
VALUES (609, 600, 'tg_game:command_message:delete', '{"i18n": "tgGame.commandMessage.delete", "type": "B", "title": "删除记录"}', '', '', '', 1, 0, 1, 1, NOW(), NOW(), '');

INSERT INTO `menu` (`id`, `parent_id`, `name`, `meta`, `path`, `component`, `redirect`, `status`, `sort`, `created_by`, `updated_by`, `created_at`, `updated_at`, `remark`)
VALUES (610, 600, 'tg_game:command_message:realDelete', '{"i18n": "tgGame.commandMessage.realDelete", "type": "B", "title": "真实删除"}', '', '', '', 1, 0, 1, 1, NOW(), NOW(), '');

COMMIT;

SET FOREIGN_KEY_CHECKS = 1;

-- ========================================
-- 菜单说明
-- ========================================
-- 本SQL文件创建了贪吃蛇游戏的完整菜单结构，包括：
-- 1. 顶级菜单（ID: 500）- 贪吃蛇游戏
-- 2. 游戏群组管理（ID: 501-509）
-- 3. 群组配置管理（ID: 510-518）
-- 4. 配置变更日志（ID: 520-523）
-- 5. 玩家钱包绑定（ID: 530-535）
-- 6. 钱包绑定日志（ID: 540-542）
-- 7. 蛇身节点管理（ID: 550-558）
-- 8. 中奖记录管理（ID: 560-568）
-- 9. 中奖转账管理（ID: 570-579）
-- 10. 派奖队列管理（ID: 580-587）
-- 11. TRON交易日志（ID: 590-598）
-- 12. Telegram命令消息记录（ID: 600-610）
--
-- 总计：1个顶级菜单 + 11个二级菜单 + 99个权限按钮 = 111条菜单记录
