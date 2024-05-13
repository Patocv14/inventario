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
          imageUrl: productDto.imageUrl,
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

  async getProduct(productId: string): Promise<ProductEntity> {
    if (!productId) throw CustomErrors.badRequest("Product id is required");
    try {
      const product = await this.prisma.product.findUnique({
        where: {
          id: productId,
        },
      });

      if (!product) throw CustomErrors.notFound("Product not found");

      return ProductMapper.productEntityFromObject(product);
    } catch (error) {
      return InternalError(error);
    }
  }
  async getProductByCategory(categoryId: string): Promise<ProductEntity[]> {
    if (!categoryId) throw CustomErrors.badRequest("Category id is required");

    try {

      const categoryExists = await this.prisma.category.findUnique({
        where: { id: categoryId },
      })
      if (!categoryExists) throw CustomErrors.badRequest("Category not found");

      const products = await this.prisma.product.findMany({
        where: {
          categoryId: categoryId,
        },
      });

      if (!products) throw CustomErrors.notFound("Products not found");

      return products.map((product) =>
        ProductMapper.productEntityFromObject(product)
      );
    } catch (error) {
      return InternalError(error);
    }
  }

  async updateProduct(productId: string, product: ProductDto): Promise<ProductEntity> {
    
    if (!productId) throw CustomErrors.badRequest("Product id is required");
    try {
      const productExists = await this.prisma.product.findUnique({
        where: {
          id: productId,
        },
      });

      if (!productExists) throw CustomErrors.notFound("Product not found");

      const updatedProduct = await this.prisma.product.update({
        where: {
          id: productId,
        },
        data: {
          name: product.name || productExists.name,
          price: product.price || productExists.price,
          description: product.description || productExists.description,
          stock: product.stock || productExists.stock,
          imageUrl: product.imageUrl || productExists.imageUrl,
          category: {
            connect: {
              id: product.categoryId || productExists.categoryId,
            },
          },
          Maker: {
            connect: {
              id: product.makerId || productExists.makerId,
            },
          
          }
        },
      });

      return ProductMapper.productEntityFromObject(updatedProduct);
    } catch (error) {
      return InternalError(error);
    }

  }

}
