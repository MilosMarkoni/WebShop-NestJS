import * as mongoose from 'mongoose';
import { CategorySchema } from '../category/category.model';

export const ProductSchema = new mongoose.Schema({
	_id: {
		type: Number,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	category: [{ type: mongoose.Schema.Types.Number, ref: 'Category' }],
	quantity: {
		type: Number,
		required: true,
	},
});

export interface Product extends mongoose.Document {
	id: number;
	name: string;
	description: string;
	category: string;
	quantity: number;
}
