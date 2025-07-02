import Product from "../entity/products.entity";



class ProductMapper {
  static toPersist(product: Product) {
    return {
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      typeProductId: product.typeProductId,
      establishmentsId: product.establishmentsId,
      userId: product.userId, // Assuming userId is part of the Product entity
    };


  }
}
export default ProductMapper;
