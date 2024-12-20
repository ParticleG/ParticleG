import { loader } from '@guolao/vue-monaco-editor';
import { boot } from 'quasar/wrappers';

// noinspection JSUnusedGlobalSymbols
export default boot(() => {
  loader.config({
    paths: {
      vs: 'https://cdn.jsdelivr.net/npm/monaco-editor@0.43.0/min/vs',
    },
  });
});
