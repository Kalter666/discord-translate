import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import { ArgNum, ArgRange } from 'discord-nestjs';

export class TranslateDto {
  @ArgRange(() => ({ formPosition: 3 }))
  @Expose()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  private _string: string[];

  @ArgNum(() => ({ position: 1 }))
  @Expose()
  @IsString({ message: 'Please define source of the language.' })
  source: string;

  @ArgNum(() => ({ position: 2 }))
  @Expose()
  @IsString({ message: 'Please define target language.' })
  target: string;

  get q(): string {
    return this._string.join(' ');
  }
}
