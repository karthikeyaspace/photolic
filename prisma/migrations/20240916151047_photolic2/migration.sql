/*
  Warnings:

  - Added the required column `aspectRatio` to the `Generation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `model` to the `Generation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `prompt` to the `Generation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Generation" ADD COLUMN     "aspectRatio" TEXT NOT NULL,
ADD COLUMN     "inferenceSteps" INTEGER NOT NULL DEFAULT 30,
ADD COLUMN     "isSaved" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "model" TEXT NOT NULL,
ADD COLUMN     "prompt" TEXT NOT NULL,
ADD COLUMN     "seed" TEXT;
