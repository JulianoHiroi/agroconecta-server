import { randomUUID } from "crypto";
import User from "../../users/entity/user.entity";
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
}
*/


export type orderProps = {
  userId: string;
  userProductId: string;
  productId: string;
  establishmentId: string;
  establishmentProductId: string;
  quantity: number;
  statusId?: number; // Default to 1 if not provided
};

class Order {
  id: string;
  userId: string;
  userProductId: string;
  productId: string;
  establishmentId: string;
  establishmentProductId: string;
  quantity: number;
  statusId: number;
  createdAt: Date;
  updatedAt: Date;

  constructor(props: orderProps) {
    this.id = randomUUID();
    this.userId = props.userId;
    this.userProductId = props.userProductId;
    this.productId = props.productId;
    this.establishmentId = props.establishmentId;
    this.establishmentProductId = props.establishmentProductId;
    this.quantity = props.quantity;
    this.statusId = props.statusId || 1; // Default status to 1 if not provided
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}



export default Order;