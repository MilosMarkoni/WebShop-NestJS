import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Counter } from './counter.model';
import { Model } from 'mongoose';

@Injectable()
export class CounterService {
	constructor(@InjectModel('Counter') private readonly counterModel: Model<Counter>) {}

	async incrementCounter(name: string) {
		await this.counterModel.findOneAndUpdate({ name }, { $inc: { id: 1 } });
	}

	async getCounter(name: string): Promise<Counter> {
		return await this.counterModel.findOne({ name });
	}
}
