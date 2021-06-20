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

  async translate(translateDto: TranslateDto): Promise<string> {
    return '';
  }

  private detectLanguage(q: string): Promise<string> {
    return axios.post(this.detectLangURI, { q });
  }

  private getTranslation(query: { q: string; source: string; target: string }) {
    return axios.post(this.translateURI, query);
  }

  private getSupportedLanguages(): Promise<
    {
      code: 'string';
      name: 'string';
    }[]
  > {
    return axios.get(this.supportedLanguagesURI);
  }
}
