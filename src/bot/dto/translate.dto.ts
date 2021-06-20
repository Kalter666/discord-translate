import { Expose, Type } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import { ArgNum, ArgRange } from 'discord-nestjs';

export class TranslateDto {
  @ArgRange(() => ({ formPosition: 1, toPosition: 2 }))
  @Expose()
  @IsString({ each: true })
  @IsNotEmpty()
  private _string: string[];

  @ArgNum((last: number) => ({ position: last }))
  @Expose()
  @Type(() => String)
  @IsString()
  language: string;

  get string(): string {
    return this._string[0];
  }
}
