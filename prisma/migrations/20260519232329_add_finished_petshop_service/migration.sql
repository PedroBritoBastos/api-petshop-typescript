/*
  Warnings:

  - Added the required column `finished` to the `PetshopService` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PetshopService" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "clientId" TEXT NOT NULL,
    "petId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "executionDate" DATETIME NOT NULL,
    "finished" BOOLEAN NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_PetshopService" ("clientId", "createdAt", "executionDate", "id", "petId", "type", "updatedAt") SELECT "clientId", "createdAt", "executionDate", "id", "petId", "type", "updatedAt" FROM "PetshopService";
DROP TABLE "PetshopService";
ALTER TABLE "new_PetshopService" RENAME TO "PetshopService";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
