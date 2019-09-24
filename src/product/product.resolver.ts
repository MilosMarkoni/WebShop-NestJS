import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { ProductService } from './product.service';
import { UsePipes } from '@nestjs/common';
import { QueryValidationPipe } from '../query-validation.pipe';
import { Product } from './product.model';
import { MessageReturnType } from '../graphql';

@Resolver('Product')
export class ProductResolver {
	constructor(private readonly productService: ProductService) {}

	@Query()
	@UsePipes(QueryValidationPipe)
	async getProducts(@Args() args): Promise<Product> {
		const products = await this.productService.getProduct(args);

		return products;
	}

	@Mutation()
	async createProduct(@Args() args) {
		const product = await this.productService.createProduct(args.data);

		return {
			data: {
				message: 'Product successfully stored into database.',
			},
			resource: [product],
		};
	}

	@Mutation()
	async updateProduct(@Args() args): Promise<MessageReturnType> {
		const { _id, name, description, category, quantity } = args.data;
		await this.productService.updateProduct(_id, name, description, category, quantity);

		return { message: 'Product successfully updated in database' };
	}

	@Mutation()
	async deleteProduct(@Args() args): Promise<MessageReturnType> {
		await this.productService.deleteProduct(args._id);

		return { message: 'Product successfully deleted from database' };
	}
}
