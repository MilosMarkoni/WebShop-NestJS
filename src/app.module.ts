import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryModule } from './category/category.module';
import { UserModule } from './user/user.module';
import { PurchaseModule } from './purchase/purchase.module';
import { LoginModule } from './login/login.module';
import { DbModule } from './db/db.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { keys } from '../config/keys';
// context: ({ req }) => ({ req }),

@Module({
	imports: [
		GraphQLModule.forRoot({
			typePaths: ['./**/*.graphql'],
			definitions: {
				path: join(process.cwd(), 'src/graphql.ts'),
				outputAs: 'class',
			},
			context: ({ req }) => ({ req }),
		}),
		MongooseModule.forRoot(keys),
		DbModule,
		ProductModule,
		CategoryModule,
		UserModule,
		PurchaseModule,
		LoginModule,
	],
	controllers: [],
	providers: [
		{
			provide: APP_GUARD,
			useClass: AuthGuard,
		},
	],
	exports: [DbModule],
})
export class AppModule {}
