import { Module } from '@nestjs/common';
import { HelloService } from './application/hello.service';
import { HelloGetController } from './infrastructure/controller/hello.get.controller';

@Module({
	imports: [],
	controllers: [HelloGetController],
	providers: [HelloService],
})
export class HelloModule {}
