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
  imageProfileUrl?: string;
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
  imageProfileUrl?: string;
  images?: {
    id: string;
    url: string;
  }[];
  products?: {
    id: string;
    price: number;
    description: string;
    idTypeProduct: string;
    name: string;
    quantity: number;
    ratingAvaliation?: number; // Optional field for average rating
  }[];
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

export type UpdateImageProfileToEstablishmentRequestDTO = {
  id: string;
  imageProfileUrl: string;
};
export type UpdateImageProfileToEstablishmentResponseDTO = {
  id: string;
  imageProfileUrl: string;
};


export type SearchEstablishmentsByFilterRequestDTO = {
  name?: string;
  idTypeProduct?: string;
  searchRadius?: number; // in meters
  lat: number; // latitude of the user's location
  lng: number; // longitude of the user's location
  idUser: string;
};

export type SearchEstablishmentsByFilterResponseDTO = {
  id: string;
  name: string;
  latitue: number;
  longitude: number;
};
