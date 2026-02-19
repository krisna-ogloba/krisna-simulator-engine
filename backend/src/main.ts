import 'reflect-metadata';
import { ValidationPipe, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SimulationModule } from '@simulators/basic/module';

async function bootstrap() {
  const logger = new Logger('Bootstrap');

  try {
    const app = await NestFactory.create(SimulationModule);

    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    );

    app.enableCors();

    const port = process.env.PORT || 3000;
    await app.listen(port);
    logger.log(`Application successfully started on port ${port}`);
  } catch (error) {
    logger.error('Error during application startup', error);
    process.exit(1);
  }
}

bootstrap().catch((err) => {
  console.error('Final bootstrap failure:', err);
  process.exit(1);
});
