/*
  Warnings:

  - You are about to drop the column `user_id` on the `tenants` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "tenants" DROP CONSTRAINT "tenants_user_id_fkey";

-- AlterTable
ALTER TABLE "tenants" DROP COLUMN "user_id";

-- CreateTable
CREATE TABLE "users_on_tenants" (
    "user_id" TEXT NOT NULL,
    "tenant_id" TEXT NOT NULL,
    "assigned_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "role" TEXT NOT NULL,

    CONSTRAINT "users_on_tenants_pkey" PRIMARY KEY ("user_id","tenant_id")
);

-- AddForeignKey
ALTER TABLE "users_on_tenants" ADD CONSTRAINT "users_on_tenants_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_on_tenants" ADD CONSTRAINT "users_on_tenants_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
