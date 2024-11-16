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

export const readFileText = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => resolve(event.target?.result as string);
    reader.onerror = () => reject(reader.error);
    reader.readAsText(file);
  });
};
