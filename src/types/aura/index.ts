import { SafeParseError, ZodError, ZodIssueCode } from 'zod';

import { ManifestSchema } from 'types/aura/constants';
import { ErrorTreeNode } from 'types/aura/types';
import { i18nCommon } from 'utils/common';

export const parseManifest = (manifestString: string) => {
  try {
    return ManifestSchema.safeParse(JSON.parse(manifestString));
  } catch (error) {
    return <SafeParseError<object>>{
      success: false,
      error: ZodError.create([
        {
          code: ZodIssueCode.custom,
          path: ['INVALID_JSON'],
          message: (<Error>error).message,
        },
      ]),
    };
  }
};

export const parseError = (error: ZodError): ErrorTreeNode[] =>
  Object.entries(
    <Record<string, { _errors: string[] }>>(<unknown>error.format()),
  )
    .filter(([path]) => path !== '_errors')
    .map(([path, { _errors: messages }]) => ({
      label: i18nCommon('zod.path', { path }),
      children: messages.map((message) => ({
        label: i18nCommon('zod.reason', { message }),
      })),
    }));
