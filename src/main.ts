import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const port: number = +(configService.get<number>('PORT') || 3000);
  const enableSwagger: boolean =
    configService.get<boolean>('ENABLE_SWAGGER') == true || false;

  if (enableSwagger) {
    const options = new DocumentBuilder()
      .setTitle('NestJS API')
      .setDescription('API documentation for the NestJS course project')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api-docs', app, document);
  }

  await app.listen(port);
}
void bootstrap();
