import { Injectable, NotFoundException } from "@nestjs/common";
import { Product } from "./product.model";
import { DiscoveryModule } from "@nestjs/core";
@Injectable()
export class ProductsService {
    private products: Product[] = [];

    constructor(){}

    insertProduct(title: string, desc: string, price: number) {
        const prodId = Math.floor((Math.random() * 10 + 1)).toString();
        const newProduct = new Product(prodId, title, desc, price);
        this.products.push(newProduct);
        return prodId;
    }
    getProducts() {
        return [...this.products];
    }
    getSingleProduct(productId: string) {
        const product = this.findProduct(productId)[0];
        return { ...product };
    }
    updateProduct(productId: string, title: string, desc: string, price: number) {
        const [product, index]: [Product, number] = this.findProduct(productId);
        const updatedProduct = { ...product };
        if (title) {
            updatedProduct.title = title;
        }
        if (desc) {
            updatedProduct.description = desc;
        }
        if (price) {
            updatedProduct.price = price;
        }
        this.products[index] = updatedProduct;
    }
    private findProduct(id: string): [Product, number] {
        const productIndex: number = this.products.findIndex((prod) => prod.id === id);
        const product = this.products[productIndex];
        if (!product) {
            throw new NotFoundException('Could not find product');
        }
        return [product, productIndex];
    }
    deleteProduct(prodId:string){
        const index = this.findProduct(prodId)[1];
        this.products.splice(index,1);
    }
}
``