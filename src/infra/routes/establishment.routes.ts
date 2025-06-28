import  { Router } from "express";
import EstablishmentServiceDomain from "../../domain/establishments/service/implementations/establishments.domain";
import EstablishmentController from "../controllers/establishment.controler";
import { AuthMiddleware } from "../polices/auth/auth.middleware";
import TokenServiceJWT from "../providers/token/implementations/tokenJWT.service";
import UserPrismaRepository from "../repositories/implementations/user.prisma.repository";
import { upload } from "../providers/multer/services/multer.services";

const establishmentController = new EstablishmentController(new EstablishmentServiceDomain());

const authMiddleware = new AuthMiddleware(
  new TokenServiceJWT(),
  new UserPrismaRepository()
);

const establishmentRoutes = Router();


establishmentRoutes.post(
    "/",
    authMiddleware.auth.bind(authMiddleware),
    establishmentController.createEstablishment.bind(establishmentController)
)

establishmentRoutes.patch(
    "/image/:establishmentId",
    authMiddleware.auth.bind(authMiddleware),
    upload.single("image"),
    establishmentController.connectImageToEstablishment.bind(establishmentController)
);

establishmentRoutes.patch(
    "/:id",
    authMiddleware.auth.bind(authMiddleware),
    establishmentController.updateEstablishment.bind(establishmentController)
);

establishmentRoutes.get(
    "/",
    authMiddleware.auth.bind(authMiddleware),
    establishmentController.getAllEstablishmentsByUserId.bind(establishmentController)
);

establishmentRoutes.get(
    "/:id",
    authMiddleware.auth.bind(authMiddleware),
    establishmentController.findById.bind(establishmentController)
);

establishmentRoutes.delete(
    "/:id",
    authMiddleware.auth.bind(authMiddleware),
    establishmentController.delete.bind(establishmentController)
);


export default establishmentRoutes;