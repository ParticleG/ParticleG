import { ManifestSchema } from 'types/aura/constants';

import { z } from 'zod';

export type Config = z.infer<typeof ManifestSchema>;
