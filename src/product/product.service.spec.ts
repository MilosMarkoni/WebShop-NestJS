import { Test } from '@nestjs/testing';
import { ProductService } from './product.service';
import { CounterService } from '../db/counter.service';
import { getModelToken } from '@nestjs/mongoose';

describe('Product service', () => {
	let service;

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
				ProductService,
				{ provide: CounterService, useClass: MockCounterService },
				{
					provide: getModelToken('Product'),
					useValue: productModel,
				},
			],
		}).compile();

		service = module.get<ProductService>(ProductService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	it('should get products', async () => {
		expect(await service.getProduct({ query: { filter: {} } })).toEqual(mockProduct);
	});

	it('should update product', async () => {
		expect(await service.updateProduct()).toEqual(mockProduct);
	});

	it('should delete product', async () => {
		expect(await service.deleteProduct()).toEqual(mockProduct);
	});

	const productModel = {
		find() {
			return this;
		},
		populate() {
			return this;
		},
		skip() {
			return this;
		},
		limit() {
			return this;
		},
		exec() {
			return mockProduct;
		},
		findByIdAndUpdate() {
			return mockProduct;
		},
		findOneAndDelete() {
			return mockProduct;
		},
	};

	class MockCounterService {
		async incrementCounter(name: string) {}

		async getCounter(name: string) {}
	}
});
