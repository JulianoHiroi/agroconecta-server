import { randomUUID } from "crypto";
import User from "../../users/entity/user.entity";
/*


model Products {
  id             String @id @default(uuid())
  name           String
  description    String
  price          Float
  image          String
  idtTypeProduct String

  TypeProduct             TypeProduct[]
  Establishments          Establishments?           @relation(fields: [establishmentsId], references: [id])
  establishmentsId        String?
  Establishments_Products Establishments_Products[]
}
*/


export type productProps = {
  name: string;
  description: string;
  price: number;
  image?: string;
  id?: string;
  typeProductId?: string;
  establishmentsId?: string;
  userId: string;
};

class Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  typeProductId?: string;
  establishmentsId?: string;
  user?: User;
  userId: string;

  constructor(props: productProps, id?: string) {
    this.id = id ? id : randomUUID();
    this.name = props.name;
    this.description = props.description;
    this.price = props.price;
    this.image = props.image;
    this.typeProductId = props.typeProductId;
    this.establishmentsId = props.establishmentsId;
    this.userId = props.userId;
  }
}



export default Product;