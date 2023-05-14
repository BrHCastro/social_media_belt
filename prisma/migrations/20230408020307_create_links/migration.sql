-- CreateTable
CREATE TABLE "links" (
    "id" TEXT NOT NULL,
    "internal_name" TEXT NOT NULL,
    "public_name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "destination" TEXT NOT NULL,
    "tenant_id" TEXT NOT NULL,

    CONSTRAINT "links_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "links" ADD CONSTRAINT "links_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
