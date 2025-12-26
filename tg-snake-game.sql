/*
 Navicat Premium Dump SQL

 Source Server         : 165.154.236.114(tg-snake)
 Source Server Type    : MySQL
 Source Server Version : 50744 (5.7.44-log)
 Source Host           : 165.154.236.114:3306
 Source Schema         : tg-snake-game

 Target Server Type    : MySQL
 Target Server Version : 50744 (5.7.44-log)
 File Encoding         : 65001

 Date: 26/12/2025 15:29:14
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for tg_game_group
-- ----------------------------
DROP TABLE IF EXISTS `tg_game_group`;
CREATE TABLE `tg_game_group` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键',
  `config_id` bigint(20) NOT NULL COMMENT '配置表ID',
  `tg_chat_id` bigint(20) NOT NULL COMMENT 'Telegram群组ID',
  `prize_pool_amount` decimal(20,8) NOT NULL DEFAULT '0.00000000' COMMENT '当前奖池金额',
  `current_snake_nodes` text COLLATE utf8mb4_unicode_ci COMMENT '当前蛇身节点ID（逗号分割）',
  `last_snake_nodes` text COLLATE utf8mb4_unicode_ci COMMENT '上次蛇身节点ID（逗号分割）',
  `last_prize_nodes` text COLLATE utf8mb4_unicode_ci COMMENT '上次中奖区间节点ID（逗号分割）',
  `last_prize_amount` decimal(20,8) NOT NULL DEFAULT '0.00000000' COMMENT '上次中奖金额',
  `last_prize_address` varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '上次中奖地址（多个用逗号分割）',
  `last_prize_serial_no` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '上次开奖流水号',
  `last_prize_at` datetime DEFAULT NULL COMMENT '上次中奖时间',
  `version` int(11) NOT NULL DEFAULT '0' COMMENT '乐观锁版本号',
  `created_at` datetime DEFAULT NULL COMMENT '创建时间',
  `updated_at` datetime DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `game_group_tg_chat_id_unique` (`tg_chat_id`) USING BTREE,
  KEY `idx_config_id` (`config_id`) USING BTREE,
  KEY `idx_last_prize_serial` (`last_prize_serial_no`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC COMMENT='游戏群组实时状态表';

-- ----------------------------
-- Records of tg_game_group
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for tg_game_group_config
-- ----------------------------
DROP TABLE IF EXISTS `tg_game_group_config`;
CREATE TABLE `tg_game_group_config` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键',
  `tenant_id` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '租户ID',
  `tg_chat_id` bigint(20) NOT NULL COMMENT 'Telegram群组ID',
  `tg_chat_title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '群组名称',
  `wallet_address` varchar(34) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'TRON钱包地址',
  `wallet_change_count` int(11) NOT NULL DEFAULT '0' COMMENT '钱包变更次数（用于区分不同钱包周期）',
  `pending_wallet_address` varchar(34) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '待更新的钱包地址',
  `wallet_change_status` tinyint(4) NOT NULL DEFAULT '1' COMMENT '钱包变更状态:1=正常,2=变更中',
  `wallet_change_start_at` datetime DEFAULT NULL COMMENT '钱包变更开始时间',
  `wallet_change_end_at` datetime DEFAULT NULL COMMENT '钱包变更生效时间',
  `hot_wallet_address` varchar(34) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '热钱包地址（用于转账）',
  `hot_wallet_private_key` varchar(128) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '热钱包私钥（加密存储）',
  `bet_amount` decimal(20,8) NOT NULL DEFAULT '5.00000000' COMMENT '投注金额(TRX)',
  `platform_fee_rate` decimal(5,4) NOT NULL DEFAULT '0.1000' COMMENT '平台手续费比例(默认10%)',
  `status` tinyint(1) NOT NULL DEFAULT '1' COMMENT '状态 1-正常 0-停用',
  `created_at` datetime DEFAULT NULL COMMENT '创建时间',
  `updated_at` datetime DEFAULT NULL COMMENT '更新时间',
  `telegram_admin_whitelist` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT '',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `game_group_config_tg_chat_id_unique` (`tg_chat_id`) USING BTREE,
  KEY `game_group_config_tenant_id_index` (`tenant_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC COMMENT='游戏群组配置表';

-- ----------------------------
-- Records of tg_game_group_config
-- ----------------------------
BEGIN;
INSERT INTO `tg_game_group_config` (`id`, `tenant_id`, `tg_chat_id`, `tg_chat_title`, `wallet_address`, `wallet_change_count`, `pending_wallet_address`, `wallet_change_status`, `wallet_change_start_at`, `wallet_change_end_at`, `hot_wallet_address`, `hot_wallet_private_key`, `bet_amount`, `platform_fee_rate`, `status`, `created_at`, `updated_at`, `telegram_admin_whitelist`) VALUES (2, '000001', -4889533705, 'Unknown', 'TKbJZ5kk9uZPhCJJjzxsuTWWRxWwCsatjP', 1, NULL, 1, NULL, NULL, NULL, NULL, 5.00000000, 0.1000, 1, '2025-12-25 17:31:02', '2025-12-25 17:46:59', '6817805820');
COMMIT;

-- ----------------------------
-- Table structure for tg_game_group_config_log
-- ----------------------------
DROP TABLE IF EXISTS `tg_game_group_config_log`;
CREATE TABLE `tg_game_group_config_log` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键',
  `config_id` bigint(20) NOT NULL COMMENT '配置表ID',
  `tg_chat_id` bigint(20) NOT NULL COMMENT 'Telegram群组ID',
  `change_params` text COLLATE utf8mb4_unicode_ci COMMENT '变更参数（JSON格式，记录本次提交的字段）',
  `old_config` text COLLATE utf8mb4_unicode_ci COMMENT '变更前的完整配置（JSON格式）',
  `new_config` text COLLATE utf8mb4_unicode_ci COMMENT '变更后的完整配置（JSON格式）',
  `operator` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '操作人',
  `operator_ip` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '操作IP',
  `change_source` tinyint(4) NOT NULL DEFAULT '1' COMMENT '变更来源:1=后台编辑,2=TG群指令',
  `tg_message_id` bigint(20) DEFAULT NULL COMMENT 'Telegram消息ID（仅TG指令时有值）',
  `created_at` datetime DEFAULT NULL COMMENT '变更时间',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `idx_config_id` (`config_id`) USING BTREE,
  KEY `idx_tg_chat_id` (`tg_chat_id`) USING BTREE,
  KEY `idx_change_source` (`change_source`) USING BTREE,
  KEY `idx_created_at` (`created_at`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC COMMENT='游戏群组配置变更记录表';

-- ----------------------------
-- Records of tg_game_group_config_log
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for tg_player_wallet_binding
-- ----------------------------
DROP TABLE IF EXISTS `tg_player_wallet_binding`;
CREATE TABLE `tg_player_wallet_binding` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键',
  `group_id` bigint(20) NOT NULL COMMENT '群组ID',
  `tg_user_id` bigint(20) NOT NULL COMMENT 'Telegram用户ID',
  `tg_username` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT 'Telegram用户名',
  `tg_first_name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT 'Telegram名字',
  `tg_last_name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT 'Telegram姓氏',
  `wallet_address` varchar(34) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '绑定的钱包地址',
  `bind_at` datetime DEFAULT NULL COMMENT '首次绑定时间',
  `created_at` datetime DEFAULT NULL COMMENT '创建时间',
  `updated_at` datetime DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `uk_group_user` (`group_id`,`tg_user_id`) USING BTREE,
  KEY `idx_wallet_address` (`wallet_address`) USING BTREE,
  KEY `idx_group_id` (`group_id`) USING BTREE,
  KEY `idx_tg_user_id` (`tg_user_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC COMMENT='玩家钱包绑定表';

-- ----------------------------
-- Records of tg_player_wallet_binding
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for tg_player_wallet_binding_log
-- ----------------------------
DROP TABLE IF EXISTS `tg_player_wallet_binding_log`;
CREATE TABLE `tg_player_wallet_binding_log` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键',
  `group_id` bigint(20) NOT NULL COMMENT '群组ID',
  `tg_user_id` bigint(20) NOT NULL COMMENT 'Telegram用户ID',
  `tg_username` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT 'Telegram用户名',
  `tg_first_name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT 'Telegram名字',
  `tg_last_name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT 'Telegram姓氏',
  `old_wallet_address` varchar(34) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '变更前钱包地址（首次绑定为空字符串）',
  `new_wallet_address` varchar(34) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '变更后钱包地址',
  `change_type` tinyint(4) NOT NULL COMMENT '变更类型:1=首次绑定,2=更新绑定',
  `created_at` datetime DEFAULT NULL COMMENT '变更时间',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `idx_group_id` (`group_id`) USING BTREE,
  KEY `idx_tg_user_id` (`tg_user_id`) USING BTREE,
  KEY `idx_group_user` (`group_id`,`tg_user_id`) USING BTREE,
  KEY `idx_created_at` (`created_at`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC COMMENT='玩家钱包绑定变更记录表';

-- ----------------------------
-- Records of tg_player_wallet_binding_log
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for tg_prize_dispatch_queue
-- ----------------------------
DROP TABLE IF EXISTS `tg_prize_dispatch_queue`;
CREATE TABLE `tg_prize_dispatch_queue` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键',
  `prize_record_id` bigint(20) NOT NULL COMMENT '中奖记录ID',
  `prize_transfer_id` bigint(20) NOT NULL COMMENT '转账记录ID',
  `group_id` bigint(20) NOT NULL COMMENT '群组ID',
  `prize_serial_no` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '开奖流水号',
  `priority` tinyint(4) NOT NULL DEFAULT '5' COMMENT '优先级(1-10,数字越小优先级越高)',
  `status` tinyint(4) NOT NULL DEFAULT '1' COMMENT '状态:1=待处理,2=处理中,3=已完成,4=失败,5=取消',
  `retry_count` int(11) NOT NULL DEFAULT '0' COMMENT '重试次数',
  `max_retry` int(11) NOT NULL DEFAULT '3' COMMENT '最大重试次数',
  `task_data` text COLLATE utf8mb4_unicode_ci COMMENT '任务数据(JSON格式)',
  `error_message` text COLLATE utf8mb4_unicode_ci COMMENT '错误信息',
  `scheduled_at` datetime DEFAULT NULL COMMENT '计划执行时间',
  `started_at` datetime DEFAULT NULL COMMENT '开始处理时间',
  `completed_at` datetime DEFAULT NULL COMMENT '完成时间',
  `version` int(11) NOT NULL DEFAULT '0' COMMENT '乐观锁版本号',
  `created_at` datetime DEFAULT NULL COMMENT '创建时间',
  `updated_at` datetime DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `idx_prize_record` (`prize_record_id`) USING BTREE,
  KEY `idx_prize_transfer` (`prize_transfer_id`) USING BTREE,
  KEY `idx_group_id` (`group_id`) USING BTREE,
  KEY `idx_serial_no` (`prize_serial_no`) USING BTREE,
  KEY `idx_status` (`status`) USING BTREE,
  KEY `idx_queue_process` (`status`,`priority`,`scheduled_at`) USING BTREE,
  KEY `idx_created_at` (`created_at`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC COMMENT='奖励发放任务队列表';

-- ----------------------------
-- Records of tg_prize_dispatch_queue
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for tg_prize_record
-- ----------------------------
DROP TABLE IF EXISTS `tg_prize_record`;
CREATE TABLE `tg_prize_record` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键',
  `group_id` bigint(20) NOT NULL COMMENT '群组ID',
  `prize_serial_no` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '开奖流水号(格式: WIN+群ID+日期时间)',
  `wallet_cycle` int(11) NOT NULL COMMENT '钱包周期（对应wallet_change_count）',
  `ticket_number` char(2) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '中奖凭证',
  `winner_node_id_first` bigint(20) NOT NULL COMMENT '中奖节点ID（首）',
  `winner_node_id_last` bigint(20) NOT NULL COMMENT '中奖节点ID（尾）',
  `winner_node_ids` text COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '中奖区间所有节点ID（逗号分割）',
  `total_amount` decimal(20,8) NOT NULL DEFAULT '0.00000000' COMMENT '区间总金额',
  `platform_fee` decimal(20,8) NOT NULL DEFAULT '0.00000000' COMMENT '平台抽成',
  `fee_rate` decimal(5,4) NOT NULL COMMENT '手续费比例（记录当时费率）',
  `prize_pool` decimal(20,8) NOT NULL DEFAULT '0.00000000' COMMENT '奖池金额',
  `prize_amount` decimal(20,8) NOT NULL DEFAULT '0.00000000' COMMENT '派奖金额（奖池-平台抽成）',
  `prize_per_winner` decimal(20,8) NOT NULL DEFAULT '0.00000000' COMMENT '每人奖金',
  `pool_remaining` decimal(20,8) NOT NULL DEFAULT '0.00000000' COMMENT '奖池剩余金额（扣除本次中奖后余额）',
  `winner_count` tinyint(4) NOT NULL DEFAULT '2' COMMENT '中奖人数',
  `status` tinyint(4) NOT NULL DEFAULT '1' COMMENT '状态:1=待处理,2=转账中,3=已完成,4=失败,5=部分失败',
  `version` int(11) NOT NULL DEFAULT '0' COMMENT '乐观锁版本号',
  `created_at` datetime DEFAULT NULL COMMENT '创建时间',
  `updated_at` datetime DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `uk_serial_no` (`prize_serial_no`) USING BTREE,
  KEY `idx_group_id` (`group_id`) USING BTREE,
  KEY `idx_status` (`status`) USING BTREE,
  KEY `idx_wallet_cycle` (`group_id`,`wallet_cycle`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC COMMENT='中奖记录表';

-- ----------------------------
-- Records of tg_prize_record
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for tg_prize_transfer
-- ----------------------------
DROP TABLE IF EXISTS `tg_prize_transfer`;
CREATE TABLE `tg_prize_transfer` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键',
  `prize_record_id` bigint(20) NOT NULL COMMENT '中奖记录ID',
  `prize_serial_no` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '开奖流水号',
  `node_id` bigint(20) NOT NULL COMMENT '中奖节点ID',
  `to_address` varchar(34) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '收款地址',
  `amount` decimal(20,8) NOT NULL DEFAULT '0.00000000' COMMENT '转账金额',
  `tx_hash` varchar(64) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '转账交易哈希',
  `status` tinyint(4) NOT NULL DEFAULT '1' COMMENT '状态:1=待处理,2=处理中,3=成功,4=失败',
  `retry_count` int(11) NOT NULL DEFAULT '0' COMMENT '重试次数',
  `error_message` text COLLATE utf8mb4_unicode_ci COMMENT '错误信息',
  `created_at` datetime DEFAULT NULL COMMENT '创建时间',
  `updated_at` datetime DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `idx_prize_record` (`prize_record_id`) USING BTREE,
  KEY `idx_serial_no` (`prize_serial_no`) USING BTREE,
  KEY `idx_status` (`status`) USING BTREE,
  KEY `idx_tx_hash` (`tx_hash`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC COMMENT='奖金转账记录表';

-- ----------------------------
-- Records of tg_prize_transfer
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for tg_snake_node
-- ----------------------------
DROP TABLE IF EXISTS `tg_snake_node`;
CREATE TABLE `tg_snake_node` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键',
  `group_id` bigint(20) NOT NULL COMMENT '群组ID',
  `wallet_cycle` int(11) NOT NULL COMMENT '钱包周期（对应wallet_change_count）',
  `ticket_number` char(2) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '购彩凭证(00-99)',
  `ticket_serial_no` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '凭证流水号(格式: YYYYMMDD-序号，如: 20250108-001)',
  `player_address` varchar(34) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '玩家钱包地址',
  `player_tg_username` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Telegram用户名',
  `player_tg_user_id` bigint(20) DEFAULT NULL COMMENT 'Telegram用户ID',
  `amount` decimal(20,8) NOT NULL DEFAULT '0.00000000' COMMENT '投注金额',
  `tx_hash` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '交易哈希',
  `block_height` bigint(20) NOT NULL COMMENT '区块高度',
  `daily_sequence` int(11) NOT NULL COMMENT '当天第几笔交易（从1开始）',
  `status` tinyint(4) NOT NULL DEFAULT '1' COMMENT '状态:1=活跃,2=已中奖,3=未中奖',
  `matched_prize_id` bigint(20) DEFAULT NULL COMMENT '匹配的中奖记录ID',
  `created_at` datetime DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `snake_node_tx_hash_unique` (`tx_hash`) USING BTREE,
  KEY `idx_group_status` (`group_id`,`status`) USING BTREE,
  KEY `idx_tx_hash` (`tx_hash`) USING BTREE,
  KEY `idx_player` (`player_address`,`group_id`) USING BTREE,
  KEY `idx_serial_no` (`ticket_serial_no`) USING BTREE,
  KEY `idx_daily_sequence` (`group_id`,`created_at`,`daily_sequence`) USING BTREE,
  KEY `idx_wallet_cycle` (`group_id`,`wallet_cycle`,`status`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC COMMENT='蛇身节点记录表';

-- ----------------------------
-- Records of tg_snake_node
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for tg_tron_transaction_log
-- ----------------------------
DROP TABLE IF EXISTS `tg_tron_transaction_log`;
CREATE TABLE `tg_tron_transaction_log` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键',
  `group_id` bigint(20) NOT NULL COMMENT '群组ID',
  `tx_hash` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '交易哈希',
  `from_address` varchar(34) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '发送地址',
  `to_address` varchar(34) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '接收地址',
  `amount` decimal(20,8) NOT NULL DEFAULT '0.00000000' COMMENT '金额(TRX)',
  `transaction_type` tinyint(4) NOT NULL DEFAULT '1' COMMENT '交易类型:1=入账,2=出账',
  `block_height` bigint(20) NOT NULL COMMENT '区块高度',
  `block_timestamp` bigint(20) NOT NULL COMMENT '区块时间戳',
  `status` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '交易状态',
  `is_valid` tinyint(1) NOT NULL DEFAULT '0' COMMENT '是否有效交易',
  `invalid_reason` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '无效原因',
  `processed` tinyint(1) NOT NULL DEFAULT '0' COMMENT '是否已处理',
  `created_at` datetime DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `tron_transaction_log_tx_hash_unique` (`tx_hash`) USING BTREE,
  KEY `idx_group_id` (`group_id`) USING BTREE,
  KEY `idx_to_address` (`to_address`) USING BTREE,
  KEY `idx_block_height` (`block_height`) USING BTREE,
  KEY `idx_processed` (`processed`) USING BTREE,
  KEY `idx_group_tx_type` (`group_id`,`transaction_type`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC COMMENT='TRON交易监听日志表';

-- ----------------------------
-- Records of tg_tron_transaction_log
-- ----------------------------
BEGIN;
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
