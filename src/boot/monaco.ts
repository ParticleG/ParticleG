import { install } from '@guolao/vue-monaco-editor';
import { boot } from 'quasar/wrappers';

// noinspection JSUnusedGlobalSymbols
export default boot(({ app }) => {
  app.use(install, {
    paths: {
      vs: 'https://cdn.jsdelivr.net/npm/monaco-editor@latest/min/vs',
    },
  });
});
