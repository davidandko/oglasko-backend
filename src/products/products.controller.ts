/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Controller, Post, Body, Get, Param, Patch,Delete } from "@nestjs/common";
import { ProductsService } from "./products.service";

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) { }
    @Post()
    async addProduct(
        @Body('owner') prodOwner: string,
        @Body('title') prodTitle: string,
        @Body('phoneNumber') prodPhoneNumber: string,
        @Body('price') prodPrice: string,
        @Body('dateAdded') prodDateAdded: string,
        @Body('dateModified') prodDateModified: string,
        @Body('mainLocation') prodMainLocation: string,
        @Body('specLocation') prodSpecLocation: string,
        @Body('description') prodDescription: string,
        @Body('photos') prodPhotos: string[],
        @Body('mainCategory') prodMainCategory: string,
        @Body('subCategory') prodSubCategory: string[]) {
        const generatedId = await this.productsService.insertProduct(
            prodOwner,
            prodTitle,
            prodPhoneNumber,
            prodPrice,
            prodDateAdded,
            prodDateModified,
            prodMainLocation,
            prodSpecLocation,
            prodDescription,
            prodPhotos,
            prodMainCategory,
            prodSubCategory,
            );
        return { id: generatedId };
    }
    @Get()
    async getAllProducts() {
        const products = await this.productsService.getProducts();
        return products
    }
    @Get(':id')
    getProduct(@Param('id') prodId: string) {
        return this.productsService.getSingleProduct(prodId);
    }

    @Patch(':id')
    async updateProduct(
        @Param('id') prodId: string,
        @Body('owner') prodOwner: string,
        @Body('title') prodTitle: string,
        @Body('phoneNumber') prodPhoneNumber: string,
        @Body('price') prodPrice: string,
        @Body('dateAdded') prodDateAdded: string,
        @Body('dateModified') prodDateModified: string,
        @Body('mainLocation') prodMainLocation: string,
        @Body('specLocation') prodSpecLocation: string,
        @Body('description') prodDescription: string,
        @Body('photos') prodPhotos: string[],
        @Body('mainCategory') prodMainCategory: string,
        @Body('subCategory') prodSubCategory: string[]) 
        {
            await this.productsService.updateProduct( 
                prodId,
                prodOwner,
                prodTitle,
                prodPhoneNumber,
                prodPrice,
                prodDateAdded,
                prodDateModified,
                prodMainLocation,
                prodSpecLocation,
                prodDescription,
                prodPhotos,
                prodMainCategory,
                prodSubCategory,);
            return null;
        }
    @Delete(':id')
    async removeProduct(
        @Param('id') prodId:string
    ){
        await this.productsService.deleteProduct(prodId);
        return null;
    }
}