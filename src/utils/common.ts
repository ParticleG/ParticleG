import { Composer } from 'vue-i18n';

export const createI18n =
  (
    composer: Composer,
    baseName: string,
  ): ((relativePath: string, data?: Record<string, unknown>) => string) =>
  (relativePath: string, data?: Record<string, unknown>) => {
    if (data) {
      return composer.t(baseName + relativePath, data);
    } else {
      return composer.t(baseName + relativePath);
    }
  };
