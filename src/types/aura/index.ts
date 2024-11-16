import { ManifestSchema } from 'types/aura/constants';
import { Manifest } from 'types/aura/types';

export const parseManifest = (manifestString: object): Manifest => {
  return ManifestSchema.parse(manifestString);
};
