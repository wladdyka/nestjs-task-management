import { CreateTaskDto } from './createTask.dto';
import { TaskStatus } from '../task-status.enum';
import { IsEnum } from 'class-validator';

export class UpdateTaskDto extends CreateTaskDto {
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
