import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';


async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const port = process.env.PORT || 3000;

    const config = new DocumentBuilder()
    .setTitle('Микросервис по работе с авторизацией')
    .setDescription('Документация REST api')
    .setVersion('1.0.0')
    .addTag('Owle')
    .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/auth/docs', app, document);


    await app.listen(port, () => {
        console.log(`Server init on port ${port}`);
    });
}
bootstrap();
