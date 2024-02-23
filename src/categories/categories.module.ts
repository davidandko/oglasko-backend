/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { CategoriesService } from "./categories.service";
import { CategoriesController } from "./categories.controller";
import { CategorySchema } from "./category.model";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
    imports: [MongooseModule.forFeature([{name:'Category',schema:CategorySchema}])],
    controllers:[CategoriesController],
    providers:[CategoriesService]
})
export class CategoriesModule {}