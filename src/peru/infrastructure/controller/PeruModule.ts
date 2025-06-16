import { Module } from '@nestjs/common';
import { PeruController } from './PeruController';
import { PeruApplicationService } from '../../application/service/PeruService';
import { PeruDomainService } from '../../domain/service/PeruService';
import { PeruMysqlDBRepository } from '../repository/PeruMysqlDBRepository';

@Module({
  controllers: [PeruController],
  providers: [
    PeruApplicationService,
    PeruDomainService,
    {
      provide: 'PeruRepository',
      useClass: PeruMysqlDBRepository
    }
    // ,
    // {
    //   provide: 'AppointmentPublisher',
    //   useClass: SnsAppointmentPublisher
    // }
  ]
})
export class PeruModule {}