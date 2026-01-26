import { IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsUrl()
  @IsOptional()
  profileImage?: string;

  @IsUrl()
  @IsOptional()
  coverImage?: string;
}
