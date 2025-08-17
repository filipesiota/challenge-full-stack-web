-- CreateTable
CREATE TABLE "public"."students" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "enrollment_number" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "students_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "students_email_key" ON "public"."students"("email");

-- CreateIndex
CREATE UNIQUE INDEX "students_enrollment_number_key" ON "public"."students"("enrollment_number");

-- CreateIndex
CREATE UNIQUE INDEX "students_cpf_key" ON "public"."students"("cpf");
