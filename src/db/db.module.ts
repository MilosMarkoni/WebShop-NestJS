import { Module, Global } from '@nestjs/common';
import { DbService } from './db.service';
import { CounterService } from './counter.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CounterSchema } from './counter.model';

@Global()
@Module({
	imports: [MongooseModule.forFeature([{ name: 'Counter', schema: CounterSchema }])],
	providers: [DbService, CounterService],
	exports: [DbService, CounterService],
})
export class DbModule {}
