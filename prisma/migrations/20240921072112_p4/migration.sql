/*
  Warnings:

  - You are about to drop the column `inferenceSteps` on the `Generation` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Generation" DROP COLUMN "inferenceSteps",
ADD COLUMN     "disableSafetyChecker" BOOLEAN NOT NULL DEFAULT false;
