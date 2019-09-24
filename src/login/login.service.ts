import { Injectable, NotFoundException } from '@nestjs/common';
import { DbService } from '../db/db.service';
import { ObjectId } from 'mongodb';
import { User } from '../graphql';
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

@Injectable()
export class LoginService {
	constructor(private readonly dbService: DbService) {}

	async login(userName: string, password: string): Promise<string> {
		const user = await this.findByCredentials(userName, password);
		const token = await this.generateAuthToken(user._id);

		return token;
	}

	async logout(req: any): Promise<User> {
		try {
			const connection = await this.dbService.connection();
			const user = req.user;

			req.user.tokens = req.user.tokens.filter(token => token.token !== req.token);

			const updatedUser = await connection
				.collection('users')
				.findOneAndUpdate(
					{ _id: ObjectId(user._id) },
					{ $set: { tokens: req.user.tokens } },
				);

			return updatedUser;
		} catch (error) {}
	}

	async logoutAll(req: any): Promise<User> {
		try {
			const connection = await this.dbService.connection();
			const user = req.user;

			req.user.tokens = [];

			const updatedUser = await connection
				.collection('users')
				.findOneAndUpdate(
					{ _id: ObjectId(user._id) },
					{ $set: { tokens: req.user.tokens } },
				);

			return updatedUser;
		} catch (error) {}
	}

	async findByCredentials(userName: string, password: string): Promise<User> {
		try {
			const connection = await this.dbService.connection();
			const user = await connection.collection('users').findOne({ userName });

			if (!user) {
				throw new Error('User not found!');
			}

			const isMatch = await bcrypt.compare(password, user.password);

			if (!isMatch) {
				throw new Error('User not found!');
			}

			return user;
		} catch (error) {
			throw new Error(error);
		}
	}

	async generateAuthToken(id: string): Promise<string> {
		try {
			const connection = await this.dbService.connection();
			const user = await connection.collection('users').findOne({ _id: id });

			const token = jwt.sign({ _id: user._id.toString() }, 'webshopsecret');
			user.tokens = user.tokens || [];

			user.tokens = user.tokens.concat({ token: token });
			await connection.collection('users').findOneAndUpdate(
				{ _id: user._id },
				{
					$set: { tokens: user.tokens },
				},
			);

			return token;
		} catch (error) {
			throw new Error(error);
		}
	}
}
