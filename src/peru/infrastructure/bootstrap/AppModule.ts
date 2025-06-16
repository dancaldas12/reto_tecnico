import { Module } from '@nestjs/common';

import { PeruModule } from '../controller/PeruModule';

const modules = [PeruModule];

@Module({
  imports: [...modules]
})
export class AppModule {}