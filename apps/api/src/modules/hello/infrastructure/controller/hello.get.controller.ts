import { Controller, Get } from '@nestjs/common';
import type { HelloResponseDto } from '@repo/types';
import { HelloService } from '../../application/hello.service';

@Controller()
export class HelloGetController {
	constructor(private readonly helloService: HelloService) {}

	@Get()
	getHello(): HelloResponseDto {
		return this.helloService.getHello();
	}
}
