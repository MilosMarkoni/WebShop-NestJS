import { Injectable } from '@nestjs/common';
import { DbService } from '../db/db.service';
import { ObjectId } from 'mongodb';
import { User } from 'src/graphql';
const bcrypt = require('bcryptjs');

@Injectable()
export class UserService {
	constructor(private readonly dbService: DbService) {}

	async createUser(body: any) {
		const connection = await this.dbService.connection();

		body.password = await bcrypt.hash(body.password, 8);

		await connection.collection('users').insertOne(body);
	}

	async getUsers(query): Promise<User> {
		try {
			const connection = await this.dbService.connection();
			const user = await connection
				.collection('users')
				.find(query.filter)
				.skip((query.pageNum - 1) * (query.perPage || 10) || 0)
				.limit(query.perPage || 10)
				.toArray();

			return user;
		} catch (error) {
			throw new Error(error);
		}
	}

	async deleteUser(id: string) {
		try {
			const connection = await this.dbService.connection();
			await connection.collection('users').deleteOne({ _id: ObjectId(id) });
		} catch (error) {
			throw new Error(error);
		}
	}

	async updateUser(userName: string, roles: string, status: string, email: string) {
		try {
			const connection = await this.dbService.connection();
			await connection
				.collection('users')
				.findOneAndUpdate({ userName }, { $set: { roles, status, email } });
		} catch (error) {
			throw new Error(error);
		}
	}
}
