import { Injectable } from '@nestjs/common';
import { MongoClient } from 'mongodb';
import { keys } from '../../config/keys';

@Injectable()
export class DbService {
	static storedConnection;

	async connection() {
		if (DbService.storedConnection === undefined) {
			try {
				const client = await MongoClient.connect(keys, {
					useNewUrlParser: true,
				});

				DbService.storedConnection = client.db('webshop');

				// intialize counters
				DbService.storedConnection
					.collection('counters')
					.find()
					.toArray((err, res) => {
						if (!res.length) {
							DbService.storedConnection
								.collection('counters')
								.insertMany([
									{ name: 'productCounter', id: 0 },
									{ name: 'categoryCounter', id: 0 },
								]);
						}
					});

				return DbService.storedConnection;
			} catch (error) {
				throw new Error(error);
			}
		} else {
			return DbService.storedConnection;
		}
	}
}
