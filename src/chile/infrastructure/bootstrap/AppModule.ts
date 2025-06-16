import { Module } from '@nestjs/common';

import { ChileModule } from '../controller/ChileModule';

const modules = [ChileModule];

@Module({
  imports: [...modules]
})
export class AppModule {}