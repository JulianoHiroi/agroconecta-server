
import ProductService from "../../domain/product/service/product.service";
import { AuthRequest } from "../polices/auth/auth.middleware";
import { Response } from "express";

class ProductController {

    constructor(private productService: ProductService) { }

    async createProduct(req: AuthRequest, res: Response) {
        const { price, description, idTypeProduct } = req.body;
        const userId = req.userId;
        if (!userId) throw new Error("invalidToken");
        const project = await this.productService.createProduct(
            {
                price,
                description,
                idTypeProduct,
                userId: userId
            }
        );
        res.status(201).json(project);
    }

    async getTypesProducts(req: AuthRequest, res: Response) {
        const typesProducts = await this.productService.getTypesProducts();
        res.status(200).json(typesProducts);
    }

    async updateProduct(req: AuthRequest, res: Response) {
        const { id, price, description, idTypeProduct } = req.body;
        if (!id) throw new Error("invalidData");
        const updatedProduct = await this.productService.updateProduct({
            id,
            price,
            description,
            idTypeProduct
        });
        res.status(200).json(updatedProduct);
    }
    async getAllProductsByEstablishmentId(req: AuthRequest, res: Response) {
        const { establishmentId } = req.params;
        if (!establishmentId) throw new Error("invalidData");
        const products = await this.productService.findAllByEstablishmentId(establishmentId);
        res.status(200).json(products);
    }
    async findAllByUserId(req: AuthRequest, res: Response) {
        const userId = req.userId;
        if (!userId) throw new Error("invalidToken");
        const products = await this.productService.findAllByUserId(userId);
        res.status(200).json(products);
    }
    async findById(req: AuthRequest, res: Response) {
        const { id } = req.params;
        if (!id) throw new Error("invalidData");
        const product = await this.productService.findById(id);
        if (!product) {
            res.status(404).json({ message: "Product not found" });
            return;
        }
        res.status(200).json(product);
    }
    async delete(req: AuthRequest, res: Response) {
        const { id } = req.params;
        const userId = req.userId;
        if (!userId) throw new Error("invalidToken");
        if (!id) throw new Error("invalidData");
        await this.productService.delete(id, userId);
        res.status(204).send();
    }
    async getAllProductsByUserId(req: AuthRequest, res: Response) {
        const userId = req.userId;
        if (!userId) throw new Error("invalidToken");
        const products = await this.productService.findAllByUserId(userId);
        res.status(200).json(products);
    }
    async connectProductToEstablishment(req: AuthRequest, res: Response) {
        const { establishmentId, productId } = req.params;
        const { quantity } = req.body;
        const userId = req.userId;
        if (!userId) throw new Error("invalidToken");
        if (!establishmentId || !productId || !quantity) {
            return res.status(400).json({ error: "All fields are required" });
        }
        const data = {
            establishmentId,
            productId,
            quantity,
            userId
        };
        const connectedProduct = await this.productService.connectProductToEstablishment(data);
        return res.status(201).json(connectedProduct);
    }

    async deleteConnectionProductToEstablishment(req: AuthRequest, res: Response) {
        const { establishmentId, productId } = req.params;
        const userId = req.userId;
        if (!userId) throw new Error("invalidToken");
        if (!establishmentId || !productId) {
            return res.status(400).json({ error: "All fields are required" });
        }
        await this.productService.deleteConnectionProductToEstablishment(establishmentId, productId);
        return res.status(204).send();
    }

    async makeAvaliation(req: AuthRequest, res: Response) {
        const { productId } = req.params;
        const { rating } = req.body;
        const userId = req.userId;
        if (!userId) throw new Error("invalidToken");
        if (!productId || !rating) {
            return res.status(400).json({ error: "All fields are required" });
        }
        await this.productService.makeAvaliation(productId, userId, rating);
        return res.status(204).send();
    }
}

export default ProductController;