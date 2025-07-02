import { Router } from "express";

import exp from "constants";
import OrderController from "../controllers/order.controller";
import OrderServiceDomain from "../../domain/order/service/implementations/order.domain";
import { AuthMiddleware } from "../polices/auth/auth.middleware";
import TokenServiceJWT from "../providers/token/implementations/tokenJWT.service";
import UserPrismaRepository from "../repositories/implementations/user.prisma.repository";

const orderRoutes = Router();

const authMiddleware = new AuthMiddleware(
    new TokenServiceJWT(),
    new UserPrismaRepository()
);

const orderService = new OrderServiceDomain();
const orderController = new OrderController(orderService);

orderRoutes.post(
    "/",
    authMiddleware.auth.bind(authMiddleware),
    orderController.createOrder.bind(orderController)
)

orderRoutes.get(
    "/user",
    authMiddleware.auth.bind(authMiddleware),
    orderController.getAllOrdersByUserId.bind(orderController)
)

orderRoutes.delete(
    "/:orderId",
    authMiddleware.auth.bind(authMiddleware),
    orderController.deleteOrder.bind(orderController)
);

orderRoutes.patch(
    "/cancel/:orderId",
    authMiddleware.auth.bind(authMiddleware),
    orderController.cancelOrder.bind(orderController)
);
orderRoutes.patch(
    "/payment/:orderId",
    authMiddleware.auth.bind(authMiddleware),
    orderController.makePayment.bind(orderController)
);

export default orderRoutes;
