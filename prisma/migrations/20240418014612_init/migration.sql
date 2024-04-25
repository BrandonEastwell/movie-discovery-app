/*
  Warnings:

  - You are about to drop the column `preferredgenre` on the `userpreferences` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "userpreferences" DROP COLUMN "preferredgenre",
ADD COLUMN     "preferredCast" VARCHAR(100),
ADD COLUMN     "preferredCrew" VARCHAR(100),
ADD COLUMN     "preferredGenre" VARCHAR(100);
