/*
  Warnings:

  - You are about to drop the column `EstablishmentId` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `EstablishmentProductId` on the `Order` table. All the data in the column will be lost.
  - Added the required column `establishmentId` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `establishmentProductId` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_EstablishmentId_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_EstablishmentProductId_fkey";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "EstablishmentId",
DROP COLUMN "EstablishmentProductId",
ADD COLUMN     "establishmentId" TEXT NOT NULL,
ADD COLUMN     "establishmentProductId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_establishmentId_fkey" FOREIGN KEY ("establishmentId") REFERENCES "Establishments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_establishmentProductId_fkey" FOREIGN KEY ("establishmentProductId") REFERENCES "Establishments_Products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
