import { Injectable } from '@nestjs/common';
import axios from 'axios';

import { TranslateDto } from '../bot/dto';
import { translateConfig } from '../config';

@Injectable()
export class TranslateService {
  private baseURL = `http://${translateConfig.url}:${translateConfig.port}`;
  private detectLangURI = `${this.baseURL}/detect`;
  private translateURI = `${this.baseURL}/translate`;
  private supportedLanguagesURI = `${this.baseURL}/languages`;

  async guessAndtranslate(translateDto: TranslateDto): Promise<string> {
    const locale = await this.detectLanguage(translateDto.q);
    return locale;
  }

  async detectLanguage(q: string): Promise<string> {
    return (
      (await axios.post(this.detectLangURI, { q })).data as {
        confidence: number;
        language: string;
      }[]
    ).map(({ language }) => `${language}`)[0];
  }

  async getTranslation({ q, source, target }: TranslateDto): Promise<string> {
    return (
      (await axios.post(this.translateURI, { q, source, target })).data as {
        translatedText: string;
      }
    ).translatedText;
  }

  async getSupportedLanguages(): Promise<
    {
      code: 'string';
      name: 'string';
    }[]
  > {
    return (await axios.get(this.supportedLanguagesURI)).data;
  }
}
