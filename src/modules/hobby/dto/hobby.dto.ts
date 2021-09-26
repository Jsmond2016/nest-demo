import { IsNotEmpty, ArrayNotEmpty, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class HobbyGetOneDto {
  @ApiProperty({ example: 1, description: '爱好id' })
  @IsNotEmpty({ message: 'hobbyId 不能为空' })
  id: number;
}

export class HobbyGetListDto {
  @ApiProperty({ example: 1, description: '分页页码' })
  @IsNotEmpty({ message: 'pageIndex 不能为空' })
  pageIndex: number;

  @ApiProperty({ example: 1, description: '分页大小' })
  @IsNotEmpty({ message: 'pageSize 不能为空' })
  pageSize: number;
}

export class HobbyCreateDto {
  @ApiProperty({ example: '唱歌', description: '爱好名称' })
  @IsNotEmpty({ message: 'hobbyName 不能为空' })
  @Length(2, 10, { message: '请输入 2-10 位的爱好名' })
  name: string;
}

export class HobbyUpdateDto extends HobbyGetOneDto {
  @ApiProperty({ example: '唱歌', description: '爱好名称' })
  @IsNotEmpty({ message: 'hobbyName 不能为空' })
  @Length(2, 10, { message: '请输入 2-10 位的爱好名' })
  name: string;
}

// export class HobbyUpdateDto extends HobbyQueryDto  HobbyCreateDto{}

export class HobbyDeleteDto extends HobbyGetOneDto {}

export class HobbyBatchDto {
  @ApiProperty({ example: [1, 2], description: '爱好id' })
  @ArrayNotEmpty({ message: 'hobbyId 不能为空' })
  hobbyIds: string[];
}
