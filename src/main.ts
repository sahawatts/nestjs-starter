import { AllExceptionsFilter } from './all-exceptions.filter';
import { MyLogger } from './my-logger';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new MyLogger(),
  });

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 3000;
  const enableSwagger = configService.get<boolean>('ENABLE_SWAGGER') || false;

  if (enableSwagger) {
    const options = new DocumentBuilder()
      .setTitle('NestJS API')
      .setDescription('API documentation for the NestJS course project')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api-docs', app, document);
  }

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
  await app.listen(port);
}
void bootstrap();
