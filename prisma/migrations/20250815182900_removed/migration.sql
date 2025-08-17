/*
  Warnings:

  - You are about to drop the column `userId` on the `Book` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Book" DROP CONSTRAINT "Book_userId_fkey";

-- AlterTable
ALTER TABLE "public"."Book" DROP COLUMN "userId";
