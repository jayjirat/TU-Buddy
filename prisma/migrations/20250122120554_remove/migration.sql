/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `User` table. All the data in the column will be lost.
  - Made the column `authorId` on table `Blog` required. This step will fail if there are existing NULL values in that column.
  - Made the column `studentID` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Blog" DROP CONSTRAINT "Blog_authorId_fkey";

-- DropIndex
DROP INDEX "User_studentID_key";

-- AlterTable
ALTER TABLE "Blog" ALTER COLUMN "authorId" SET NOT NULL,
ALTER COLUMN "authorId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "id",
ALTER COLUMN "studentID" SET NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("studentID");

-- AddForeignKey
ALTER TABLE "Blog" ADD CONSTRAINT "Blog_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("studentID") ON DELETE RESTRICT ON UPDATE CASCADE;
