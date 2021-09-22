import { IsNotEmpty, Length } from 'class-validator'

export class CreateUserDto {
  
  readonly id: string;

  @IsNotEmpty({message: 'name不能为空'})
  readonly name: string;

  @IsNotEmpty({message: 'phone不能为空'})
  @Length(6, 20, {message: 'phone长度不合法'})
  readonly phone: string;
}


export class GetOneUserDto {
  @IsNotEmpty({message: 'id不能为空'})
  readonly id: string;
}

export class GetUserListDto {
  @IsNotEmpty({message: 'pageIndex不能为空'})
  pageIndex: number;

  @IsNotEmpty({message: 'pageSize不能为空'})
  pageSize: number;
}

export class DeleteUserDto {
  @IsNotEmpty({message: 'id不能为空'})
  readonly id: string;
}