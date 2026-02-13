/*
  Warnings:

  - You are about to drop the column `done` on the `task` table. All the data in the column will be lost.
  - You are about to drop the column `xpReward` on the `task` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `level` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `xp` on the `user` table. All the data in the column will be lost.
  - Added the required column `xp` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `task` DROP COLUMN `done`,
    DROP COLUMN `xpReward`,
    ADD COLUMN `completed` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `xp` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `createdAt`,
    DROP COLUMN `level`,
    DROP COLUMN `name`,
    DROP COLUMN `xp`;
