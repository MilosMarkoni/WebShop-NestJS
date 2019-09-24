import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { Category } from './category.model';
import { InjectModel } from '@nestjs/mongoose';
import { CounterService } from '../db/counter.service';

@Injectable()
export class CategoryService {
	constructor(
		@InjectModel('Category') private readonly categoryModel: Model<Category>,
		private readonly counterService: CounterService,
	) {}

	async createCategory(name: string, description: string): Promise<Category> {
		const categoryId = await this.counterService.getCounter('categoryCounter');
		await this.counterService.incrementCounter('categoryCounter');

		const category = new this.categoryModel({ _id: categoryId.id, name, description });
		const result = await category.save();

		return result;
	}

	async getAllCategories(): Promise<Category> {
		const categories = await this.categoryModel.find();
		return categories;
	}

	async getSpecificCategory(id: string): Promise<Category> {
		const category = await this.categoryModel.findById(id);
		return category;
	}

	async deleteCategory(id: string): Promise<Category> {
		const deletedCategory = await this.categoryModel.findOneAndDelete({ _id: id });
		return deletedCategory;
	}
}
