import { CanActivate, ExecutionContext, Injectable, Request, Inject } from '@nestjs/common';
import { Observable } from 'rxjs';
import { DbService } from './db/db.service';
import { ObjectId } from 'mongodb';
import { GqlExecutionContext } from '@nestjs/graphql';
const jwt = require('jsonwebtoken');

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(private readonly db: DbService) {}

	canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
		const ctx = GqlExecutionContext.create(context);

		if (context.getHandler().name === 'login' || context.getHandler().name === 'getUsers') {
			return true;
		} else {
			return this.auth(ctx.getContext().req);
		}
	}

	async auth(args: any): Promise<boolean> {
		try {
			if (!args.headers.authorization) {
				return false;
			}

			const token = args.headers.authorization.replace('Bearer ', '');
			const decoded = jwt.verify(token, 'webshopsecret');

			const connection = await this.db.connection();
			const user = await connection
				.collection('users')
				.findOne({ _id: ObjectId(decoded._id), 'tokens.token': token });

			if (!user) {
				return false;
			}

			args.user = user;
			args.token = token;

			return true;
		} catch (error) {
			throw new Error(error);
		}
	}
}
