/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from "@nestjs/common";
import { Product } from "./product.model";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from 'mongoose';


@Injectable()
export class ProductsService {

    constructor(@InjectModel('Product') private readonly productModel: Model<Product>) { }

    async insertProduct(
        owner: string,
        title:string,
        phoneNumber: string,
        price: string,
        dateAdded: string,
        dateModified: string,
        mainLocation: string,
        specLocation: string,
        description: string,
        photos: string[],
        mainCategory: string,
        subCategory: string[],) {
        const newProduct = new this.productModel({
            owner:owner,
            title:title,
            phoneNumber:phoneNumber,
            price:price,
            dateAdded:dateAdded,
            dateModified:dateModified,
            mainLocation:mainLocation,
            specLocation:specLocation,
            description:description,
            photos:photos,
            mainCategory:mainCategory,
            subCategory:subCategory
        });
        const result = await newProduct.save();
        console.log(result);
        return result.id as string;
    }
    async getProducts() {
        const products = await this.productModel.find().exec();
        return products.map((prod) => (
            {   
                id: prod.id,
                owner:prod.owner,
                title:prod.title,
                phoneNumber:prod.phoneNumber,
                price:prod.price,
                dateAdded:prod.dateAdded,
                dateModified:prod.dateModified,
                mainLocation:prod.mainLocation,
                specLocation:prod.specLocation,
                description:prod.description,
                photos:prod.photos,
                mainCategory:prod.mainCategory,
                subCategory:prod.subCategory
            }));
    }
    async getSingleProduct(productId: string) {
        const prod = await this.findProduct(productId);
        return {
            owner:prod.owner,
                title:prod.title,
                phoneNumber:prod.phoneNumber,
                price:prod.price,
                dateAdded:prod.dateAdded,
                dateModified:prod.dateModified,
                mainLocation:prod.mainLocation,
                specLocation:prod.specLocation,
                description:prod.description,
                photos:prod.photos,
                mainCategory:prod.mainCategory,
                subCategory:prod.subCategory
        };
    }
    async updateProduct(
        id:string,
        owner: string,
        title:string,
        phoneNumber: string,
        price: string,
        dateAdded: string,
        dateModified: string,
        mainLocation: string,
        specLocation: string, // specific area
        description: string,
        photos: string[],
        mainCategory: string,
        subCategory: string[],) {
        const updatedProduct = await this.findProduct(id);
        if (owner) {
            updatedProduct.owner = owner;
        }
        if (title) {
            updatedProduct.title = title;
        }
        if (phoneNumber) {
            updatedProduct.phoneNumber = phoneNumber;
        }
        if (price) {
            updatedProduct.price = price;
        }
        if (dateAdded) {
            updatedProduct.dateAdded = dateAdded;
        }
        if (dateModified) {
            updatedProduct.dateModified = dateModified;
        }
        if (mainLocation) {
            updatedProduct.mainLocation = mainLocation;
        }
        if (specLocation) {
            updatedProduct.specLocation = specLocation;
        }
        if (description) {
            updatedProduct.description = description;
        }
        if (mainCategory) {
            updatedProduct.mainCategory = mainCategory;
        }
        if (photos) {
            updatedProduct.photos = photos;
        }
        if (subCategory) {
            updatedProduct.subCategory = subCategory;
        }
        updatedProduct.save();
    }
    private async findProduct(id: string): Promise<Product> {
        let product;
        try {
            product = await this.productModel.findById(id).exec();
        } catch (error) {
            throw new NotFoundException('Could not find product');
        }
        if (!product) {
            throw new NotFoundException('Could not find product');
        }

        return product;
    }
    async deleteProduct(prodId: string) {
        const result = await this.productModel.deleteOne({ _id: prodId }).exec();
        if (result.deletedCount === 0) {
            throw new NotFoundException('Could not find product.');
        }
    }
}
``