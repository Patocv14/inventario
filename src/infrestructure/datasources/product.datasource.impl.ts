import { PrismaClient } from "@prisma/client";
import {
  CustomErrors,
  ProductDatasource,
  ProductDto,
  ProductEntity,
} from "../../domain";
import { InternalError, uuid } from "../../config";
import { ProductMapper } from "../mappers";

export class ProductDatasourceImpl implements ProductDatasource {
  private prisma = new PrismaClient();

  async createProduct(productDto: ProductDto): Promise<ProductEntity> {
    try {
      const productExits = await this.prisma.product.findUnique({
        where: { name: productDto.name },
      });
      if (productExits) throw CustomErrors.badRequest("Product already exists");

      const categoryExists = await this.prisma.category.findUnique({
        where: { id: productDto.categoryId },
      });
      if (!categoryExists) throw CustomErrors.badRequest("Category not found");
      const makerExists = await this.prisma.maker.findUnique({
        where: { id: productDto.makerId },
      });
      if (!makerExists) throw CustomErrors.badRequest("Maker not found");

      const product = await this.prisma.product.create({
        data: {
          id: uuid(),
          name: productDto.name,
          price: productDto.price,
          description: productDto.description,
          stock: productDto.stock,
          imageUrl: productDto.imgUrl,
          category: {
            connect: {
              id: productDto.categoryId,
            },
          },
          Maker: {
            connect: {
              id: productDto.makerId,
            },
          },
        },
      });

      return ProductMapper.productEntityFromObject(product);
    } catch (error) {
      return InternalError(error);
    }
  }

  async getProducts(): Promise<ProductEntity[]> {
    try {
      const products = await this.prisma.product.findMany();
      return products.map((product) =>
        ProductMapper.productEntityFromObject(product)
      );
    } catch (error) {
      return InternalError(error);
    }
  }
}
