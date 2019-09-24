import { Module } from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { PurchaseResolver } from './purchase.resolver';

@Module({
	controllers: [],
	providers: [PurchaseService, PurchaseResolver],
})
export class PurchaseModule {}
