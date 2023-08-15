/*
  Warnings:

  - You are about to drop the column `miltiplier` on the `SessionType` table. All the data in the column will be lost.
  - Added the required column `multiplier` to the `SessionType` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SessionType" DROP COLUMN "miltiplier",
ADD COLUMN     "multiplier" DECIMAL(65,30) NOT NULL;
