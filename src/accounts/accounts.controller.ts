import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { AccountsService } from './accounts.service';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Post()
  async addAccount(
    @Body('name') accName: string,
    @Body('surname') accSurname: string,
    @Body('primaryEmail') accPrimaryEmail: string,
    @Body('secondaryEmail') accSecondaryEmail: string,
    @Body('password') accPassword: string,
    @Body('passwordSalt') accPasswordSalt: string,
    @Body('dateOfBirth') accDateOfBirth: string,
  ) {
    const generatedId = await this.accountsService.insertAccount(
      accName,
      accSurname,
      accPrimaryEmail,
      accSecondaryEmail,
      accPassword,
      accPasswordSalt,
      accDateOfBirth,
    );
    return { id: generatedId };
  }

  @Get()
  async getAllAccounts() {
    const accounts = await this.accountsService.getAccounts();
    return accounts;
  }

  @Get(':id')
  getAccount(@Param('id') accId: string) {
    return this.accountsService.getSingleAccount(accId);
  }

  @Patch(':id')
  async updateAccount(
    @Param('id') accId: string,
    @Body('name') accName: string,
    @Body('surname') accSurname: string,
    @Body('primaryEmail') accPrimaryEmail: string,
    @Body('secondaryEmail') accSecondaryEmail: string,
    @Body('password') accPassword: string,
    @Body('passwordSalt') accPasswordSalt: string,
    @Body('dateOfBirth') accDateOfBirth: string,
  ) {
    await this.accountsService.updateAccount(
      accId,
      accName,
      accSurname,
      accPrimaryEmail,
      accSecondaryEmail,
      accPassword,
      accPasswordSalt,
      accDateOfBirth,
    );
    return null;
  }
  @Delete(':id')
  async removeAccount(@Param('id') accId: string) {
    await this.accountsService.deleteAccount(accId);
    return null;
  }
}
