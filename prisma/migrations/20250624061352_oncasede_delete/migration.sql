-- DropForeignKey
ALTER TABLE "CompanyImage" DROP CONSTRAINT "CompanyImage_companyId_fkey";

-- AddForeignKey
ALTER TABLE "CompanyImage" ADD CONSTRAINT "CompanyImage_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;
