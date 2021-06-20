// eslint-disable-next-line @typescript-eslint/no-var-requires
const translate = require('translate');

export const translateProvider = async (options) => {
  translate.engine = 'libre';
  translate.url = options.url;
  translate.port = options.port;
  return translate;
};
