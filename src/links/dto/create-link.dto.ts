import { Transform } from 'class-transformer';
import { IsUrl, IsString } from 'class-validator';

export class CreateLinkDto {
  @IsString()
  @Transform((v: { value?: string }) => v.value?.trim())
  code: string;

  @IsUrl()
  @Transform((v: { value?: string }) => v.value?.trim())
  link: string;
}
