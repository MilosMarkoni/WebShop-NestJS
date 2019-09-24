import * as mongoose from 'mongoose';

export const CounterSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	id: {
		type: Number,
		required: true,
	},
});

export interface Counter extends mongoose.Document {
	id: Number;
	name: string;
}
