import { SafeParseError, ZodError, ZodIssueCode } from 'zod';

import { ManifestSchema } from 'types/aura/constants';
import { ErrorTreeNode } from 'types/aura/types';
import { i18nCommon } from 'utils/common';

export const parseManifest = (manifestData: object | string) => {
  try {
    return ManifestSchema.safeParse(
      typeof manifestData === 'string'
        ? JSON.parse(manifestData)
        : manifestData,
    );
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

type ErrorTree = { _errors: string[] } & Record<string, object>;

const parseMessage = (
  rootPath: string,
  errorTree: ErrorTree,
): { path: string; messages: string[] }[] => {
  if (errorTree._errors.length) {
    return [
      {
        path: rootPath,
        messages: errorTree._errors.map((error) =>
          i18nCommon('zod.reason', { message: error }),
        ),
      },
    ];
  } else {
    return Object.entries(errorTree)
      .filter(([path]) => path !== '_errors')
      .map(([childPath, childValue]) =>
        parseMessage(`${rootPath}.${childPath}`, <ErrorTree>childValue),
      )
      .flat();
  }
};

export const parseError = (error: ZodError): ErrorTreeNode[] => [
  {
    label: i18nCommon('zod.manifestRoot'),
    children: parseMessage('', <ErrorTree>(<unknown>error.format())).map(
      ({ path, messages }) => ({
        label: path.substring(1),
        children: messages.map((message) => ({
          label: message,
        })),
      }),
    ),
  },
];
