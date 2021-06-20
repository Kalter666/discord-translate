import { DynamicModule, Module } from '@nestjs/common';
import { translateProvider } from './translate.provider';
import { TranslateService } from './translate.service';

@Module({})
export class TranslateModule {
  static forRoot(options): DynamicModule {
    const provider = {
      provide: 'TranslateToken',
      useFactory: () => translateProvider(options),
    };
    return {
      global: true,
      module: TranslateModule,
      providers: [provider, TranslateService],
      exports: [TranslateService],
    };
  }
}
