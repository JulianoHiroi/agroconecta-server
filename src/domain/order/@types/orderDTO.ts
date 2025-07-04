/*


odel Order {
  id String @id @default(uuid())

  // Quem fez o pedido
  userId String
  user   User   @relation("OrderUserMake", fields: [userId], references: [id])

  // De quem é o produto
  userProductId String
  userProduct   User   @relation("OrderUserProduct", fields: [userProductId], references: [id])

  // Produto e estabelecimento
  productId              String
  product                Product                 @relation(fields: [productId], references: [id])
  EstablishmentId        String
  Establishment          Establishments          @relation(fields: [EstablishmentId], references: [id])
  EstablishmentProductId String
  EstablishmentProduct   Establishments_Products @relation(fields: [EstablishmentProductId], references: [id])

  quantity Int
  statusId Int         @default(1)
  status   StatusOrder @relation(fields: [statusId], references: [id])

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  Payment Payment[]
}

*/

export type CreateOrderDTO = {
  userId: string;
  productId: string;
  establishmentId: string;
  quantity: number;
  statusId?: number; // Default to 1 if not provided
};
export type CreateOrderResponseDTO = {
  id: string;
};

export type GetAllOrderDTO = {
  userId: string;
};

export type GetOrderResponseDTO = {
  id: string;
  productId: string;
  establishmentId: string;
  quantity: number;
  statusId: number;
  statusName: string;
  createdAt: Date;
  updatedAt: Date;
  productName: string;
  amoutPayment: number;
  establishmentName: string;
  userId: string;
  userProductId: string;
};