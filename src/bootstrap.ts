import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ExampleModule } from './example.module';

export async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(ExampleModule);

    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
        }),
    );

    const options = new DocumentBuilder()
        .setTitle('example')
        .build();

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('swagger', app, document);

    await app.listen(3000);

    console.info(`Swagger ${await app.getUrl()}/swagger`);

    if (process && typeof process.send === 'function') {
        process.send('ready');
    }
}

bootstrap();
