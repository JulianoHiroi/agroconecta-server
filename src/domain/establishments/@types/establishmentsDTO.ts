/**
 * 
 * 
model Establishments {
  id          String  @id @default(uuid())
  name        String
  logradouro  String
  number      String
  CEP         String
  phone       String
  urlImage    String?
  description String?
  idUser      String
  user        User    @relation(fields: [idUser], references: [id])
}
\model EstablishmentsImages {
  id              String         @id @default(uuid())
  urlImage        String
  establishmentId String
  establishment   Establishments @relation(fields: [establishmentId], references: [id])
}

FAça a classe CreateEstablishmentRequestDTO que representa o corpo da requisição para criar um estabelecimento
 */

export type CreateEstablishmentRequestDTO = { 
  name: string;
  logradouro: string;
  number: string;
  latitue?: number;
  longitude?: number;
  CEP: string;
  phone: string;
  description?: string;
  userId: string;
};
export type CreateEstablishmentResponseDTO = {
  id: string;
  name: string;
  logradouro: string;
  latitue: number;
  longitude: number;
  number: string;
  CEP: string;
  phone: string;
  description?: string;
};

export type ConnectImageToEstablishmentsRequestDTO = {
  establishmentId: string;
  urlImage: string;
};

export type ConnectImageToEstablishmentsResponseDTO = {
  id: string;
  urlImage: string;
  establishmentId: string;
};


export type UpdateEstablishmentRequestDTO = {
  id: string;
  name?: string;
  logradouro?: string;
  latitue?: number;
  longitude?: number;
  number?: string;
  CEP?: string;
  phone?: string;
  description?: string;
  userId?: string;
};

export type UpdateEstablishmentResponseDTO = {
  id: string;
  name: string;
  logradouro: string;
  latitue: number;
  longitude: number;
  number: string;
  CEP: string;
  phone: string;
  description?: string;
};

