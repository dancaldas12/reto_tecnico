import { Module } from '@nestjs/common';
import { ChileController } from './ChileController';
import { ChileApplicationService } from '../../application/service/ChileService';
import { ChileDomainService } from '../../domain/service/ChileService';
import { ChileMysqlDBRepository } from '../repository/ChileMysqlDBRepository';

@Module({
  controllers: [ChileController],
  providers: [
    ChileApplicationService,
    ChileDomainService,
    {
      provide: 'ChileRepository',
      useClass: ChileMysqlDBRepository
    }
    // ,
    // {
    //   provide: 'AppointmentPublisher',
    //   useClass: SnsAppointmentPublisher
    // }
  ]
})
export class ChileModule {}