import { Injectable } from '@nestjs/common';
import type { HelloResponseDto } from '@repo/types';

@Injectable()
export class HelloService {
	getHello(): HelloResponseDto {
		return { message: 'Hello World!' };
	}
}
