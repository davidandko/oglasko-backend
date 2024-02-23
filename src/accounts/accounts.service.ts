/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Injectable,NotFoundException } from "@nestjs/common";
import { Account } from "./accounts.model";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class AccountsService {
    constructor(@InjectModel('Account') private readonly accountModel: Model<Account>){}

    async insertAccount(
        name: string,
        surname: string,
        primaryEmail: string,
        secondaryEmail: string,
        password: string,
        passwordSalt: string,
        dateOfBirth: string,
    )
    {
        const newAccount = new this.accountModel({
            name: name,
            surname: surname,
            primaryEmail: primaryEmail,
            secondaryEmail: secondaryEmail,
            password: password,
            passwordSalt: passwordSalt,
            dateOfBirth: dateOfBirth,
        });
        const result = await newAccount.save();
        console.log(result);
        return result.id as string;
    }
    async getAccounts() {
        const products = await this.accountModel.find().exec();
        return products.map((acc) => (
            {   
                id: acc.id,
                name: acc.name,
                surname: acc.surname,
                primaryEmail: acc.primaryEmail,
                secondaryEmail: acc.secondaryEmail,
                password: acc.password,
                passwordSalt: acc.passwordSalt,
                dateOfBirth: acc.dateOfBirth,
            }));
    }
    async getSingleAccount(accId: string) {
        const acc = await this.findAccount(accId);
        return {
            id: acc.id,
            name: acc.name,
            surname: acc.surname,
            primaryEmail: acc.primaryEmail,
            secondaryEmail: acc.secondaryEmail,
            password: acc.password,
            passwordSalt: acc.passwordSalt,
            dateOfBirth: acc.dateOfBirth,
        };

    }
    async updateAccount(
        id: string,
        name: string,
        surname: string,
        primaryEmail: string,
        secondaryEmail: string,
        password: string,
        passwordSalt: string,
        dateOfBirth: string,) {
        const updatedAccount = await this.findAccount(id);
        if (name) {
            updatedAccount.name = name;
        }
        if (surname) {
            updatedAccount.surname = surname;
        }
        if (primaryEmail) {
            updatedAccount.primaryEmail = primaryEmail;
        }
        if (secondaryEmail) {
            updatedAccount.secondaryEmail = secondaryEmail;
        }
        if (password) {
            updatedAccount.password = password;
        }
        if (passwordSalt) {
            updatedAccount.passwordSalt = passwordSalt;
        }
        if (dateOfBirth) {
            updatedAccount.dateOfBirth = dateOfBirth;
        }
        updatedAccount.save();
    }
    private async findAccount(id: string): Promise<Account> {
        let account;
        try {
            account = await this.accountModel.findById(id).exec();
        } catch (error) {
            throw new NotFoundException('Could not find account');
        }
        if (!account) {
            throw new NotFoundException('Could not find account');
        }

        return account;
    }
    async deleteAccount(accId:string){
        const result = await this.accountModel.deleteOne({_id: accId}).exec();
        if(result.deletedCount === 0 ){
            throw new NotFoundException('Could not find account.');
        }
    }
}