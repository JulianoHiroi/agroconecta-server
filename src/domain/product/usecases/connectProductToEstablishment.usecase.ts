import EstablishmentRepository from "../../../infra/repositories/establishment.repository";
import ProductRepository from "../../../infra/repositories/product.repository";
import EstablishmentError from "../../establishments/error/establishments.error";
import ProductError from "../error/product.error";

/*

model Establishments_Products {
  id              String         @id @default(uuid())
  establishmentId String
  productId       String
  quantity        Int
  period          String
  establishment   Establishments @relation(fields: [establishmentId], references: [id])
  product         Product        @relation(fields: [productId], references: [id])

  @@unique([establishmentId, productId])
}

*/
type ConnectProductToEstablishmentRequest = {
    establishmentId: string;
    productId: string;
    quantity: number;
}

type ConnectProductToEstablishmentResponse = {
  id: string;
  idEstablishment: string;
  idProduct: string;
  quantity: number;
};

class ConnectProductToEstablishmentUseCase {
  constructor(private productRepository: ProductRepository
    ,private establishmentRepository: EstablishmentRepository
  ) {}

  async execute(data: ConnectProductToEstablishmentRequest) : Promise<ConnectProductToEstablishmentResponse> {
    if (!data.establishmentId || !data.productId) {
      throw new EstablishmentError("invalidData");
    }

    const establishment = await this.establishmentRepository.findById(data.establishmentId);
    if (!establishment) {
      throw new EstablishmentError("notFound");
    }
    const product = await this.productRepository.findById(data.productId);
    if (!product) {
        throw new ProductError("notFound");
    }

    const existingConnection = await this.productRepository.findConnectionByEstablishmentAndProduct(data.establishmentId, data.productId);
    if (existingConnection) {
        throw new EstablishmentError("alreadyExists");
        }
    const connection = await this.productRepository.connectProductToEstablishment({
      establishmentId: data.establishmentId,
        productId: data.productId,
        quantity: data.quantity,
    });
    if (!connection) {
      throw new EstablishmentError("connectionFailed");
    }
    return {
      id: connection.id,
      idEstablishment: connection.establishmentId,
      idProduct: connection.productId,
        quantity: connection.quantity,
    };

}
}
export default ConnectProductToEstablishmentUseCase;