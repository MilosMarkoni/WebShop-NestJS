import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class QueryValidationPipe implements PipeTransform {
	transform(value: any, metadata: ArgumentMetadata) {
		let perPage = 10;
		let pageNum = 1;

		if (value.data.perPage) {
			perPage = value.data.perPage;
			delete value.data.perPage;
		}

		if (value.data.pageNum) {
			pageNum = value.data.pageNum;
			delete value.data.pageNum;
		}

		return { pageNum, perPage, filter: { ...value.data } };
	}
}
