import { Test } from '@nestjs/testing';
import { ProductService } from './product.service';
import { ProductResolver } from './product.resolver';
import { Injectable } from '@nestjs/common';
import { Product } from '../graphql';
import { Args } from '@nestjs/graphql';

describe('Product resolver', () => {
	let resolver;

	const mockProduct = {
		_id: 22,
		name: 'New product',
		description: 'Some desc',
		quantity: 22,
		category: [3],
	};

	beforeEach(async () => {
		const module = await Test.createTestingModule({
			providers: [
				ProductResolver,
				{
					provide: ProductService,
					useClass: MockProductService,
				},
			],
		}).compile();

		resolver = module.get<ProductResolver>(ProductResolver);
	});

	it('should be defined - prodider', () => {
		expect(resolver).toBeDefined();
	});

	it('run getProducts method', async () => {
		expect(await resolver.getProducts()).toEqual(mockProduct);
	});

	it('run createProduct method', async () => {
		expect(await resolver.createProduct({ data: {} })).toEqual({
			data: {
				message: 'Product successfully stored into database.',
			},
			resource: [mockProduct],
		});
	});

	it('run updateProduct method', async () => {
		expect(await resolver.updateProduct({ data: {} })).toEqual({
			message: 'Product successfully updated in database',
		});
	});

	it('run deleteProduct method', async () => {
		expect(await resolver.deleteProduct({ _id: mockProduct._id })).toEqual({
			message: 'Product successfully deleted from database',
		});
	});

	@Injectable()
	class MockProductService {
		async getProduct(@Args() args): Promise<Product> {
			return mockProduct;
		}

		async createProduct(@Args() args) {
			return mockProduct;
		}

		async updateProduct(@Args() args) {}

		async deleteProduct(@Args() args) {}
	}
});
