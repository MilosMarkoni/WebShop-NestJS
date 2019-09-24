import * as mongoose from 'mongoose';

export const CategorySchema = new mongoose.Schema({
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
});

export interface Category extends mongoose.Document {
	_id: number;
	name: string;
	description: string;
}
