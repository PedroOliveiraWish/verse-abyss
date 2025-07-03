/*
  Warnings:

  - You are about to drop the `TextOnTag` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `tagId` to the `Text` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "TextOnTag" DROP CONSTRAINT "TextOnTag_tagId_fkey";

-- DropForeignKey
ALTER TABLE "TextOnTag" DROP CONSTRAINT "TextOnTag_textId_fkey";

-- AlterTable
ALTER TABLE "Text" ADD COLUMN     "tagId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "TextOnTag";

-- AddForeignKey
ALTER TABLE "Text" ADD CONSTRAINT "Text_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
