-- CreateTable
CREATE TABLE "Establishments" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "logradouro" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "CEP" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "description" TEXT,
    "idUser" TEXT NOT NULL,

    CONSTRAINT "Establishments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EstablishmentsImages" (
    "id" TEXT NOT NULL,
    "urlImage" TEXT NOT NULL,
    "establishmentId" TEXT NOT NULL,

    CONSTRAINT "EstablishmentsImages_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Establishments" ADD CONSTRAINT "Establishments_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EstablishmentsImages" ADD CONSTRAINT "EstablishmentsImages_establishmentId_fkey" FOREIGN KEY ("establishmentId") REFERENCES "Establishments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
