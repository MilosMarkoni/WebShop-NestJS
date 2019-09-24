import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { PurchaseService } from './purchase.service';
import { UsePipes } from '@nestjs/common';
import { QueryValidationPipe } from '../query-validation.pipe';
import { Purchase, MessageReturnType } from '../graphql';

@Resolver('Purchase')
export class PurchaseResolver {
	constructor(private readonly purchaseService: PurchaseService) {}

	@Query()
	@UsePipes(QueryValidationPipe)
	async getPurchase(@Args() args): Promise<Purchase[]> {
		const purchases = await this.purchaseService.getSpecificPurchase(args);

		return purchases;
	}

	@Mutation()
	async createPurchase(@Args() args): Promise<MessageReturnType> {
		const { userName, quantity, productId, purchaseDate } = args.data;
		await this.purchaseService.createPurchase(userName, quantity, productId, purchaseDate);

		return { message: 'Purchase successfuly made.' };
	}
}
