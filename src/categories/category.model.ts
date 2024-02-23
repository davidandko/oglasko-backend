/* eslint-disable prettier/prettier */
import mongoose from "mongoose";

export const CategorySchema = new mongoose.Schema({
    title: {type: String, required: true},
    subcategories: {type: Array<string>, required: true}
})


export interface Category extends mongoose.Document{
    id: string,
    title: string,
    subcategories: string[],
}