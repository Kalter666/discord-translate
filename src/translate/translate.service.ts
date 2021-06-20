import { Injectable } from '@nestjs/common';
import { InjetcTranslate } from './translate.decorator';

@Injectable()
export class TranslateService {
  constructor(@InjetcTranslate() private translate) {}

  translateString(target: string, lang: string) {
    return this.translate(target, lang);
  }
}
