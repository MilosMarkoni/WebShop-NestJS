import { LoginService } from './login.service';
import { Resolver, Args, Query } from '@nestjs/graphql';
import { LoginOutput } from '../graphql';

@Resolver('Login')
export class LoginResolver {
	constructor(private readonly loginService: LoginService) {}

	@Query()
	async login(@Args() args): Promise<LoginOutput> {
		const { userName, password } = args.data;
		const token = await this.loginService.login(userName, password);

		return {
			token,
			message: 'Token is succesfully created.',
			code: 200,
		};
	}
}
