/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Injectable,NotFoundException } from "@nestjs/common";
import { Category } from "./category.model";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class CategoriesService {
    constructor(@InjectModel('Category') private readonly categoryModel: Model<Category>){}

    async insertCategory(
        title: string,
        subcategories: string[],
    )
    {
        const newCategory = new this.categoryModel({
            title: title,
            subcategories: subcategories,
        });
        const result = await newCategory.save();
        console.log(result);
        return result.id as string;
    }
    async getCategories() {
        const categories = await this.categoryModel.find().exec();
        return categories.map((cat) => (
            {   
                id: cat.id,
                title: cat.title,
                subcategories: cat.subcategories,
            }));
    }
    async getSingleCategory(catId: string) {
        const cat = await this.findCategory(catId);
        return {
            id: cat.id,
            title: cat.title,
            subcategories: cat.subcategories,
        };

    }
    async updateCategory(
        id: string,
        title: string,
        subcategories: string[],
       ) {
        const updatedCategory = await this.findCategory(id);
        if (title) {
            updatedCategory.title = title;
        }
       if(subcategories){
        updatedCategory.subcategories = subcategories;
       }

        updatedCategory.save();
    }
    private async findCategory(id: string): Promise<Category> {
        let category;
        try {
            category = await this.categoryModel.findById(id).exec();
        } catch (error) {
            throw new NotFoundException('Could not find category');
        }
        if (!category) {
            throw new NotFoundException('Could not find category');
        }

        return category;
    }
    async deleteCategory(catId:string){
        const result = await this.categoryModel.deleteOne({_id: catId}).exec();
        if(result.deletedCount === 0 ){
            throw new NotFoundException('Could not find category.');
        }
    }
}