import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from './product.model';
import { ProductResolver } from './product.resolver';

@Module({
	imports: [MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }])],
	providers: [ProductService, ProductResolver],
})
export class ProductModule {}
