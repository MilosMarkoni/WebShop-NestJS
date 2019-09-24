import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UsePipes } from '@nestjs/common';
import { QueryValidationPipe } from '../query-validation.pipe';
import { User, MessageReturnType } from '../graphql';

@Resolver('User')
export class UserResolver {
	constructor(private readonly userService: UserService) {}

	@Query()
	@UsePipes(QueryValidationPipe)
	async getUsers(@Args() args): Promise<User> {
		const users = await this.userService.getUsers(args);

		return users;
	}

	@Mutation()
	async createUser(@Args() args): Promise<MessageReturnType> {
		await this.userService.createUser(args.data);

		return { message: 'User successfully created!' };
	}

	@Mutation()
	async updateUser(@Args() args): Promise<MessageReturnType> {
		const { userName, roles, status, email } = args.data;
		await this.userService.updateUser(userName, roles, status, email);

		return { message: 'User updated successfully!' };
	}

	@Mutation()
	async deleteUser(@Args('id') id: string): Promise<MessageReturnType> {
		await this.userService.deleteUser(id);

		return { message: 'User updated successfully!' };
	}
}
