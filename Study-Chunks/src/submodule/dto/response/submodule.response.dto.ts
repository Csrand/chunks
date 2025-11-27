import { Expose, Type } from 'class-transformer';
import { ModuleResponseDto } from 'src/modules/dto/response/module.response.dto';

export class SubmoduleResponseDto {
  @Expose()
  submoduleId: number;

  @Expose()
  title: string;

  @Expose()
  explanation: string;

  @Expose()
  @Type(() => ModuleResponseDto)
  module: ModuleResponseDto;
}
