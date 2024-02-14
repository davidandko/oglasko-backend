/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { MongooseModule } from '@nestjs/mongoose';
import { uri } from './env';
@Module({
  imports: [ProductsModule,MongooseModule.forRoot(uri)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
