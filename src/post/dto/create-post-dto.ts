import { IsInt, IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  content: string;

  @IsUrl()
  @IsOptional()
  image?: string;

  @IsInt()
  userId: number;
}
