import { NestFactory } from '@nestjs/core';
import { SimulationModule } from './infrastructure/simulation.module';

async function bootstrap() {
  const app = await NestFactory.create(SimulationModule);

  app.enableCors();

  await app.listen(3000);
}
bootstrap();
