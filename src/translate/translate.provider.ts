// eslint-disable-next-line @typescript-eslint/no-var-requires
const translate = require('translate');

export const translateProvider = async ({ url, port }) => {
  translate.engine = 'libre';
  translate.url = `http://${url}:${port}`;
  return translate;
};
