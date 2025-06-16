import { Module } from '@nestjs/common';
import { AppointmentController } from './AppointmentController';
import { AppointmentRequestValidation } from '../../application/validation/AppointmentValidation';
import { AppointmentApplicationService } from '../../application/service/AppointmentService';
import { AppointmentDomainService } from '../../domain/service/AppointmentService';
import { AppointmentDynamoDBRepository } from '../repository/AppointmentDynamoDBRepository';
import { SnsSupport } from '../../../common/application/supports';
// import { SnsAppointmentPublisher } from '../publisher/SnsAppointmentPublisher';

@Module({
  controllers: [AppointmentController],
  providers: [
    AppointmentRequestValidation,
    AppointmentApplicationService,
    AppointmentDomainService,
    {
      provide: 'AppointmentRepository',
      useClass: AppointmentDynamoDBRepository
    },
    SnsSupport,
    // ,
    // {
    //   provide: 'AppointmentPublisher',
    //   useClass: SnsAppointmentPublisher
    // }
  ],
  imports: [SnsSupport],
})
export class AppointmentModule {}