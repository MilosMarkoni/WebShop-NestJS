import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CategoryService } from './category.service';
import { Category } from './category.model';
import { MessageReturnType } from '../graphql';

@Resolver('Category')
export class CategoryResolver {
	constructor(private readonly categoryService: CategoryService) {}

	@Query()
	async getCategories(): Promise<Category> {
		const categories = await this.categoryService.getAllCategories();
		return categories;
	}

	@Mutation()
	async createCategory(@Args() args) {
		const { name, description } = args.data;
		const category = await this.categoryService.createCategory(name, description);

		return {
			data: {
				message: 'Category successfully stored into database.',
			},
			resource: [category],
		};
	}

	@Mutation()
	async deleteCategory(@Args() args): Promise<MessageReturnType> {
		await this.categoryService.deleteCategory(args._id);

		return { message: 'Category successfully deleted from database.' };
	}
}
