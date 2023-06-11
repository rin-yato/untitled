ALTER TABLE `sessions` ADD `status` enum('open','pending','closed') DEFAULT 'open' NOT NULL;--> statement-breakpoint
ALTER TABLE `sessions` DROP COLUMN `is_active`;