/*


model Products {
  id             String @id @default(uuid())
  name           String
  description    String
  idtTypeProduct String

  TypeProduct             TypeProduct[]
  Establishments_Products Establishments_Products[]
  Establishments          Establishments?           @relation(fields: [establishmentsId], references: [id])
  establishmentsId        String?
}

*/

export type CreateProductDTO = {
  price: number;
  description: string;
  idTypeProduct: string;
  userId: string; // Assuming you want to associate the product with a user
}

export type CreateProductResponseDTO = {
  id: string;
  price: number;
  name: string;
  description: string;
  idTypeProduct: string;
  avaliationRating?: number; // Optional field for average rating 
}

export type UpdateProductDTO = {
  id: string;
  price?: number;
  description?: string;
  idTypeProduct?: string;
}

export type UpdateProductResponseDTO = {
  id: string;
  price: number;
  description: string;
  idTypeProduct: string;
  name: string;
}

export type DeleteProductDTO = {
  id: string;
  userId: string;
}

export type ConnectProductToEstablishmentRequestDTO = {
  establishmentId: string;
  productId: string;
  quantity: number;
}

export type ConnectProductToEstablishmentResponseDTO = {
  id: string;
  establishmentId: string;
  productId: string;
  quantity: number;
}
