/*
  Warnings:

  - You are about to drop the column `omment_count` on the `Post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "omment_count",
ADD COLUMN     "comment_count" INTEGER NOT NULL DEFAULT 0;
