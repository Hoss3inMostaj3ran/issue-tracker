-- AlterTable
ALTER TABLE `issue` MODIFY `status` ENUM('OPEN', 'CLOSE', 'IN_PROGRESS', 'UNDEFINED') NOT NULL DEFAULT 'OPEN';
