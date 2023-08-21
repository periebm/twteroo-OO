import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty({ message: 'All fields are required!' })
  username: string; // required().string().max(1)

  @IsString()
  @IsUrl()
  @IsNotEmpty({ message: 'All fields are required!' })
  avatar: string;
}
