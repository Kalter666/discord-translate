import { Injectable } from '@nestjs/common';
import axios from 'axios';

import { NoSourceTranslateDto, TranslateDto } from '../bot/dto';
import { translateConfig } from '../config';

@Injectable()
export class TranslateService {
  private baseURL = `http://${translateConfig.url}:${translateConfig.port}`;
  private detectLangURI = `${this.baseURL}/detect`;
  private translateURI = `${this.baseURL}/translate`;
  private supportedLanguagesURI = `${this.baseURL}/languages`;

  async guessAndtranslate({
    q,
    target,
  }: NoSourceTranslateDto): Promise<string> {
    const source = await this.detectLanguage(q);
    if (!source) {
      return `can't guess source language`;
    }
    return this.getTranslation({ q, target, source });
  }

  async detectLanguage(q: string): Promise<string> {
    return (
      (await axios.post(this.detectLangURI, { q })).data as {
        confidence: number;
        language: string;
      }[]
    ).map(({ language }) => `${language}`)[0];
  }

  async getTranslation({
    q,
    source,
    target,
  }:
    | TranslateDto
    | { q: string; source: string; target: string }): Promise<string> {
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
