import { IsNotEmpty, Length, ArrayNotEmpty } from 'class-validator'
import {
  ApiProperty
} from '@nestjs/swagger';
export class CreateUserDto {

  @ApiProperty({example: '小明', description: '用户名'})
  @IsNotEmpty({message: 'name不能为空'})
  readonly name: string;

  @ApiProperty({example: '13567890909', description: '手机号码'})
  @IsNotEmpty({message: 'phone不能为空'})
  @Length(6, 20, {message: 'phone长度不合法'})
  readonly phone: string;
}

export class CreateUserResDto {

  @ApiProperty({example: '3', description: '必须是一个存在的用户id'})
  @IsNotEmpty({message: '用户id不能为空'})
  readonly id: string;

  @ApiProperty({example: '小明', description: '用户名'})
  @IsNotEmpty({message: 'name不能为空'})
  readonly name: string;

  @ApiProperty({example: '13567890909', description: '手机号码'})
  @IsNotEmpty({message: 'phone不能为空'})
  @Length(6, 20, {message: 'phone长度不合法'})
  readonly phone: string;
}

export class UpdateUserDto extends CreateUserDto {

  @ApiProperty({example: 3, description: '必须是一个存在的用户id'})
  @IsNotEmpty({message: '用户id不能为空'})
  readonly id: number;
}


export class GetOneUserDto {

  @ApiProperty({example: 3, description: '必须是一个存在的用户id'})
  @IsNotEmpty({message: 'id不能为空'})
  readonly id: number;
}

export class GetUserListDto {

  @ApiProperty({example: 1, description: '列表的页数'})
  @IsNotEmpty({message: 'pageIndex不能为空'})
  pageIndex: number;

  @ApiProperty({example: 20, description: '列表的页大小'})
  @IsNotEmpty({message: 'pageSize不能为空'})
  pageSize: number;
}

export class DeleteUserDto {
  @ApiProperty({example: 3, description: '必须是一个存在的用户id'})
  @IsNotEmpty({message: 'id不能为空'})
  readonly id: number;
}
export class BatchDeleteUserDto {
  @ApiProperty({ example: { userIds: [1 ,2]}, description: '必须是一个存在的用户id数组'})
  @ArrayNotEmpty({ message: 'id不能为空' })
  readonly userIds: number[];
}