import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './product.model';
import { CounterService } from '../db/counter.service';

@Injectable()
export class ProductService {
	constructor(
		@InjectModel('Product') private readonly productModel: Model<Product>,
		private readonly counterService: CounterService,
	) {}

	async getAllProducts(): Promise<Product[]> {
		const products = await this.productModel.find();

		if (!products) {
			throw new NotFoundException('No products found!');
		}

		return products;
	}

	async getProduct(query: any): Promise<Product> {
		// const product = await this.productModel
		// 	.find(query.filter)
		// 	.populate('categories')
		// 	.skip((query.pageNum - 1) * (query.perPage || 10) || 0)
		// 	.limit(query.perPage || 10);

		const product = await this.productModel
			.find(query.filter)
			.populate('category')
			.skip((query.pageNum - 1) * (query.perPage || 10) || 0)
			.limit(query.perPage || 10)
			.exec();

		if (!product) {
			throw new NotFoundException('Product not found!');
		}

		return product;
	}

	async createProduct(body): Promise<Product> {
		const productId = await this.counterService.getCounter('productCounter');
		body._id = productId.id;
		await this.counterService.incrementCounter('productCounter');

		const product = new this.productModel(body);
		const result = await product.save();

		return result;
	}

	async updateProduct(
		id: string,
		name: string,
		description: string,
		category: string,
		quantity: number,
	): Promise<Product> {
		const updatedProduct = await this.productModel.findByIdAndUpdate(
			id,
			{ name, description, category, quantity },
			{ new: true },
		);

		return updatedProduct;
	}

	async deleteProduct(id: string): Promise<Product> {
		const deletedProduct = await this.productModel.findOneAndDelete({ _id: id });

		return deletedProduct;
	}
}
