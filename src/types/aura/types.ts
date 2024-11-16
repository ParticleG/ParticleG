import { z } from 'zod';

import { ManifestSchema } from 'types/aura/constants';

export type Manifest = z.infer<typeof ManifestSchema>;

export interface ErrorTreeNode {
  icon?: string;
  label: string;
  children?: ErrorTreeNode[];
}
