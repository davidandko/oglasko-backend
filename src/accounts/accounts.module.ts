/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { AccountsService } from "./accounts.service";
import { AccountsController } from "./accounts.controller";
import { AccountSchema } from "./accounts.model";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
    imports: [MongooseModule.forFeature([{name:'Account',schema:AccountSchema}])],
    controllers:[AccountsController],
    providers:[AccountsService]
})
export class AccountsModule {}