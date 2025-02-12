-- CreateEnum
CREATE TYPE "TypeUser" AS ENUM ('Juridica', 'natural');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" VARCHAR(150) NOT NULL,
    "ci" VARCHAR(10) NOT NULL,
    "password" TEXT NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tipo_user" "TypeUser" NOT NULL,
    "is_active" TEXT NOT NULL DEFAULT 'FALSE',
    "is_deleted" TEXT NOT NULL DEFAULT 'FALSE',
    "isUpdate" TEXT NOT NULL DEFAULT 'FALSE',
    "idRol" TEXT NOT NULL,
    "idUnidad" TEXT NOT NULL,
    "refresh_token" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rol" (
    "id" TEXT NOT NULL,
    "tipo" VARCHAR(100) NOT NULL,
    "is_active" TEXT NOT NULL DEFAULT 'FALSE',
    "is_deleted" TEXT NOT NULL DEFAULT 'FALSE',
    "isUpdate" TEXT NOT NULL DEFAULT 'FALSE',

    CONSTRAINT "Rol_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Unidad" (
    "id" TEXT NOT NULL,
    "unidad" VARCHAR(100) NOT NULL,
    "is_active" TEXT NOT NULL DEFAULT 'FALSE',
    "is_deleted" TEXT NOT NULL DEFAULT 'FALSE',
    "isUpdate" TEXT NOT NULL DEFAULT 'FALSE',

    CONSTRAINT "Unidad_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Firmar" (
    "id" TEXT NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "idUser" TEXT NOT NULL,
    "idDocumento" TEXT NOT NULL,
    "idToken" TEXT NOT NULL,
    "validado" TEXT NOT NULL DEFAULT 'FALSE',
    "is_active" TEXT NOT NULL DEFAULT 'FALSE',
    "is_deleted" TEXT NOT NULL DEFAULT 'FALSE',
    "isUpdate" TEXT NOT NULL DEFAULT 'FALSE',

    CONSTRAINT "Firmar_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Documento" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "tipo_documento" VARCHAR(500) NOT NULL,
    "documento_blob" TEXT NOT NULL,
    "is_active" TEXT NOT NULL DEFAULT 'FALSE',
    "is_deleted" TEXT NOT NULL DEFAULT 'FALSE',
    "isUpdate" TEXT NOT NULL DEFAULT 'FALSE',

    CONSTRAINT "Documento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Token" (
    "id" TEXT NOT NULL,
    "tipo" VARCHAR(100) NOT NULL,
    "id_token_provedor" TEXT NOT NULL,
    "ci_titual" VARCHAR(10) NOT NULL,
    "email_titular" TEXT NOT NULL,
    "descripcion_titular" TEXT NOT NULL,
    "id_certificado" TEXT NOT NULL,
    "is_active" TEXT NOT NULL DEFAULT 'FALSE',
    "is_deleted" TEXT NOT NULL DEFAULT 'FALSE',
    "isUpdate" TEXT NOT NULL DEFAULT 'FALSE',

    CONSTRAINT "Token_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Certificado" (
    "id" TEXT NOT NULL,
    "tipo_certificado" TEXT NOT NULL,
    "desde" TIMESTAMP(3) NOT NULL,
    "hasta" TIMESTAMP(3) NOT NULL,
    "emisor" TEXT NOT NULL,

    CONSTRAINT "Certificado_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_ci_key" ON "User"("ci");

-- CreateIndex
CREATE UNIQUE INDEX "Rol_tipo_key" ON "Rol"("tipo");

-- CreateIndex
CREATE UNIQUE INDEX "Unidad_unidad_key" ON "Unidad"("unidad");

-- CreateIndex
CREATE UNIQUE INDEX "Documento_nombre_key" ON "Documento"("nombre");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_idRol_fkey" FOREIGN KEY ("idRol") REFERENCES "Rol"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_idUnidad_fkey" FOREIGN KEY ("idUnidad") REFERENCES "Unidad"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Firmar" ADD CONSTRAINT "Firmar_idToken_fkey" FOREIGN KEY ("idToken") REFERENCES "Token"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Firmar" ADD CONSTRAINT "Firmar_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Firmar" ADD CONSTRAINT "Firmar_idDocumento_fkey" FOREIGN KEY ("idDocumento") REFERENCES "Documento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Token" ADD CONSTRAINT "Token_id_certificado_fkey" FOREIGN KEY ("id_certificado") REFERENCES "Certificado"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
