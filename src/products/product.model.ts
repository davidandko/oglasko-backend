/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';
export const ProductSchema = new mongoose.Schema({
   owner: {type:String, required: true},
   title: {type: String, required:true},
   phoneNumber: {type: String, required:true},
   price: {type: String, required:true},
   dateAdded: {type: String, required:true},
   dateModified: {type: String, required:false},
   mainLocation: {type: String, required:true},
   specLocation: {type: String, required:false},
   description: {type: String, required:true},
   photos: {type: String, required:true},
   mainCategory: {type: String, required:true},
   subCategory: {type: String, required:false},
   
});

export interface Product extends mongoose.Document{
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
    subCategory: string[],
}