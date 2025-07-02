import { Request, Response, NextFunction } from "express";
import { AuthRequest } from "../polices/auth/auth.middleware";
import OrderService from "../../domain/order/service/order.service";
import UserError from "../../domain/users/errors/user.errors";

class OrderController {
    constructor(private readonly OrderService: OrderService) { }

    async createOrder(req: AuthRequest, res: Response) {
        const { productId, establishmentId, quantity } = req.body;
        const userId = req.userId;
        console.log("userId", userId);
        if (!userId) {
            res.status(401).json({ message: "invalidToken" });
            return;
        }


        const order = await this.OrderService.createOrder({
            userId,
            productId,
            establishmentId,
            quantity
        });
        res.status(201).json(order);
    }

    async getAllOrdersByUserId(req: AuthRequest, res: Response) {
        const userId = req.userId;
        console.log("userId", userId);
        if (!userId) {
            res.status(401).json({ message: "invalidToken" });
            return;
        }
        const orders = await this.OrderService.findAllByUserId(userId);
        if (!orders) {
            res.status(404).json({ message: "No orders found" });
            return;
        }
        console.log("orders", orders);
        res.status(200).json(orders);
    }

    async deleteOrder(req: AuthRequest, res: Response) {
        const { orderId } = req.params;
        if (!orderId) {
            res.status(400).json({ message: "Order ID is required" });
            return;
        }
        try {
            await this.OrderService.deleteOrder(orderId);
            res.status(204).send();
        } catch (error) {
            if (error instanceof UserError) {
                res.status(404).json({ message: error.message });
            } else {
                res.status(500).json({ message: "Internal server error" });
            }
        }
    }

    async cancelOrder(req: AuthRequest, res: Response) {
        const { orderId } = req.params;
        if (!orderId) {
            res.status(400).json({ message: "Order ID is required" });
            return;
        }
        try {
            await this.OrderService.cancelOrder(orderId);
            res.status(204).send();
        } catch (error) {
            if (error instanceof UserError) {
                res.status(404).json({ message: error.message });
            } else {
                res.status(500).json({ message: "Internal server error" });
            }
        }
    }

    async makePayment(req: AuthRequest, res: Response) {
        const { orderId } = req.params;
        const userId = req.userId;
        if (!userId) {
            res.status(401).json({ message: "invalidToken" });
            return;
        }
        if (!orderId) {
            res.status(400).json({ message: "Order ID is required" });
            return;
        }
        try {
            await this.OrderService.makePayment(orderId, userId);
            res.status(204).send();
        } catch (error) {
            if (error instanceof UserError) {
                res.status(404).json({ message: error.message });
            } else {
                res.status(500).json({ message: "Internal server error" });
            }
        }
    }

}
export default OrderController;
