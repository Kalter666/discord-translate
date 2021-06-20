import { Injectable } from '@nestjs/common';
import { InjetcTranslate } from './translate.decorator';

@Injectable()
export class TranslateService {
  constructor(@InjetcTranslate() private translate) {}

  translateString(target: string, lang: string) {
    try {
      return this.translate.translate(target, lang);
    } catch {
      throw new Error(
        'Translation server is down, try again in a couple of minutes',
      );
    }
  }
}
