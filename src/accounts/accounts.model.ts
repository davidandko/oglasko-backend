/* eslint-disable prettier/prettier */

import * as mongoose from 'mongoose';
export const AccountSchema = new mongoose.Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  primaryEmail: { type: String, required: true },
  secondaryEmail: { type: String, required: true },
  password: { type: String, required: true },
  passwordSalt: { type: String, required: true },
  dateOfBirth: { type: String, required: true },
});

export interface Account extends mongoose.Document {
  id: string,
  name: string,
  surname: string,
  primaryEmail: string,
  secondaryEmail: string,
  password: string,
  passwordSalt: string,
  dateOfBirth: string,
}
