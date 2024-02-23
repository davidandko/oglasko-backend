/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    Controller,
    Post,
    Body,
    Get,
    Param,
    Patch,
    Delete,
  } from '@nestjs/common';
import { CategoriesService } from './categories.service';
  
  @Controller('categories')
  export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) {}
  
    @Post()
    async addCategory(
      @Body('title') catTitle: string,
      @Body('subcategories') catSubcategories: string[],
    
    ) {
      const generatedId = await this.categoriesService.insertCategory(
        catTitle,
        catSubcategories,
      );
      return { id: generatedId };
    }
  
    @Get()
    async getAllCategories() {
      const categories = await this.categoriesService.getCategories();
      return categories;
    }
  
    @Get(':id')
    getCategory(@Param('id') catId: string) {
      return this.categoriesService.getSingleCategory(catId);
    }
  
    @Patch(':id')
    async updateCategory(
      @Param('id') catId: string,
      @Body('title') catTitle: string,
      @Body('subcategories') catSubcategories: string[],
    ) {
      await this.categoriesService.updateCategory(
        catId,
        catTitle,
        catSubcategories,
      );
      return null;
    }
    @Delete(':id')
    async removeCategory(@Param('id') catId: string) {
      await this.categoriesService.deleteCategory(catId);
      return null;
    }
  }
  