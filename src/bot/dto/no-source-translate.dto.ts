import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import { ArgNum, ArgRange } from 'discord-nestjs';

export class NoSourceTranslateDto {
  @ArgRange(() => ({ formPosition: 2 }))
  @Expose()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  private _string: string[];

  @ArgNum(() => ({ position: 1 }))
  @Expose()
  @IsString({ message: 'Please define target language.' })
  target: string;

  get q(): string {
    return this._string.join(' ');
  }
}
