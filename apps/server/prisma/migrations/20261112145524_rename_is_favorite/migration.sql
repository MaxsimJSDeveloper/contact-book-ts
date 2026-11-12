/*
  Warnings:

  - You are about to drop the column `isFavourite` on the `contacts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "contacts" DROP COLUMN "isFavourite",
ADD COLUMN     "isFavorite" BOOLEAN NOT NULL DEFAULT false;
