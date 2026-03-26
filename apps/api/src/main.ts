import { createHttpApp } from '@authuser/nest-fastify-kit';
import { AppModule } from './app.module';

async function bootstrap() {
	const app = await createHttpApp({
		rootModule: AppModule,
		appName: 'template',
		preset: 'secure',
		apiPrefix: 'api',
		apiVersioning: true,
		docs: process.env.NODE_ENV !== 'production',
	});

	await app.listen(Number(process.env.PORT ?? 3000), '0.0.0.0');
}

void bootstrap();
