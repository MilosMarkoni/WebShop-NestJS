import { Injectable } from '@nestjs/common';
import { DbService } from '../db/db.service';
import { Purchase } from '../graphql';

@Injectable()
export class PurchaseService {
	constructor(private readonly dbService: DbService) {}

	async createPurchase(
		userName: string,
		quantity: number,
		productId: number,
		purchaseDate: Date,
	): Promise<Purchase> {
		try {
			const connection = await this.dbService.connection();
			const purchase = await connection
				.collection('purchases')
				.insertOne({ userName, quantity, productId, purchaseDate });

			return purchase;
		} catch (error) {
			throw new Error(error);
		}
	}

	// userName: string, dateFrom: Date, dateTo: Date, productId
	async getSpecificPurchase(query: any): Promise<Purchase[]> {
		try {
			const connection = await this.dbService.connection();

			const purchases = await connection
				.collection('purchases')
				.aggregate([
					{
						$match: {
							userName: query.filter.userName,
							productId: parseInt(query.filter.productId),
							purchaseDate: {
								$gte: query.filter.dateFrom,
								$lte: query.filter.dateTo,
							},
						},
					},
				])
				.skip((query.pageNum - 1) * (query.perPage || 10) || 0)
				.limit(query.perPage || 10)
				.toArray();

			return purchases;
		} catch (error) {
			throw new Error(error);
		}
	}
}
