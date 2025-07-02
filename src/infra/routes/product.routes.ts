import { Router } from "express";

import ProductController from "../controllers/product.controller";
import { AuthMiddleware } from "../polices/auth/auth.middleware";
import TokenServiceJWT from "../providers/token/implementations/tokenJWT.service";
import UserPrismaRepository from "../repositories/implementations/user.prisma.repository";
import ProductServiceDomain from "../../domain/product/service/implementations/product.domain";

const productController = new ProductController(new ProductServiceDomain());

const authMiddleware = new AuthMiddleware(
  new TokenServiceJWT(),
  new UserPrismaRepository()
);

const productRoutes = Router();

productRoutes.post(
  "/",
  authMiddleware.auth.bind(authMiddleware),
  productController.createProduct.bind(productController)
);

productRoutes.post(
  "/avaliation/:productId",
  authMiddleware.auth.bind(authMiddleware),
  productController.makeAvaliation.bind(productController)
);

productRoutes.get(
  "/types",
  productController.getTypesProducts.bind(productController)
);

productRoutes.get(
  "//:establishmentId",
  productController.getAllProductsByEstablishmentId.bind(productController)
);
productRoutes.get(
  "/user",
  authMiddleware.auth.bind(authMiddleware),
  productController.findAllByUserId.bind(productController)
);
productRoutes.get(
  "/:id",
  productController.findById.bind(productController)
);
productRoutes.patch(
  "/",
  authMiddleware.auth.bind(authMiddleware),
  productController.updateProduct.bind(productController)
);
productRoutes.delete(
  "/:id",
  authMiddleware.auth.bind(authMiddleware),
  productController.delete.bind(productController)
);

productRoutes.patch(
  "/connect/:establishmentId/:productId",
  authMiddleware.auth.bind(authMiddleware),
  productController.connectProductToEstablishment.bind(productController)
);

productRoutes.delete(
  "/disconnect/:establishmentId/:productId",
  authMiddleware.auth.bind(authMiddleware),
  productController.deleteConnectionProductToEstablishment.bind(productController)
);

export default productRoutes;