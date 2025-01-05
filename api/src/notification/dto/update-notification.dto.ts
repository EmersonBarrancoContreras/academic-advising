import { PartialType } from '@nestjs/mapped-types';
import { CreateNotificacionDto } from './create-notification.dto';

export class UpdateNotificationDto extends PartialType(CreateNotificacionDto) {}
