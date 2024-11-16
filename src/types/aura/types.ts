import { ManifestSchema } from 'types/aura/constants';

import { z } from 'zod';

export type Manifest = z.infer<typeof ManifestSchema>;
