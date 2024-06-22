/*
  Warnings:

  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE `environment` DROP FOREIGN KEY `Environment_createdById_fkey`;

-- DropForeignKey
ALTER TABLE `location` DROP FOREIGN KEY `Location_createdById_fkey`;

-- DropForeignKey
ALTER TABLE `modality` DROP FOREIGN KEY `Modality_createdById_fkey`;

-- DropForeignKey
ALTER TABLE `profile` DROP FOREIGN KEY `Profile_userId_fkey`;

-- DropForeignKey
ALTER TABLE `region` DROP FOREIGN KEY `Region_createdById_fkey`;

-- DropForeignKey
ALTER TABLE `travelblog` DROP FOREIGN KEY `TravelBlog_createdById_fkey`;

-- DropForeignKey
ALTER TABLE `yogablog` DROP FOREIGN KEY `YogaBlog_createdById_fkey`;

-- AlterTable
ALTER TABLE `environment` MODIFY `createdById` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `location` MODIFY `createdById` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `modality` MODIFY `createdById` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `profile` MODIFY `userId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `region` MODIFY `createdById` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `travelblog` MODIFY `createdById` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `user` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `yogablog` MODIFY `createdById` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `TravelBlog` ADD CONSTRAINT `TravelBlog_createdById_fkey` FOREIGN KEY (`createdById`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `YogaBlog` ADD CONSTRAINT `YogaBlog_createdById_fkey` FOREIGN KEY (`createdById`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Region` ADD CONSTRAINT `Region_createdById_fkey` FOREIGN KEY (`createdById`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Environment` ADD CONSTRAINT `Environment_createdById_fkey` FOREIGN KEY (`createdById`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Modality` ADD CONSTRAINT `Modality_createdById_fkey` FOREIGN KEY (`createdById`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Location` ADD CONSTRAINT `Location_createdById_fkey` FOREIGN KEY (`createdById`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Profile` ADD CONSTRAINT `Profile_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
