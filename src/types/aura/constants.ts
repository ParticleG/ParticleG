import { z } from 'zod';

const ShapeSchema = z.union([
  z.object({
    type: z.literal('circle'),
    radius: z.number(),
  }),
  z.object({
    type: z.literal('rectangle'),
    width: z.number(),
    height: z.number(),
  }),
  z.object({
    type: z.literal('custom'),
    data: z.string(),
  }),
]);

const ConfigSchema = z.object({
  name: z.string(),
  beads: z.array(
    z.object({
      position: z.object({
        x: z.number(),
        y: z.number(),
        rotation: z.number(),
      }),
      shape: ShapeSchema,
    }),
  ),
  viewport: z.object({
    width: z.number(),
    height: z.number(),
    shape: z.optional(ShapeSchema),
  }),
});

const DataFormatSchema = z.object({
  type: z.literal('binary'),
  schema: z.string(),
});

const PersonSchema = z.object({
  name: z.string(),
  email: z.optional(z.string()),
  url: z.optional(z.string()),
}).or(z.string());

const ProtocolSchema = z.object({
  type: z.union([
    z.literal('bluetooth'),
    z.literal('http'),
    z.literal('serial'),
    z.literal('ws'),
  ]),
  format: z.object({
    download: DataFormatSchema,
    upload: DataFormatSchema,
  }),
});

export const ManifestSchema = z.object({
  edition: z.literal(1),
  name: z.string(),
  version: z.string(),
  description: z.optional(z.string()),
  author: PersonSchema,
  contributors: z.optional(z.array(PersonSchema)),
  license: z.optional(z.string()),
  repository: z.optional(
    z.string().or(
      z.object({
        type: z.string(),
        url: z.string(),
        directory: z.optional(z.string()),
      }),
    ),
  ),
  configurations: z.array(ConfigSchema).nonempty(),
  data: z.object({
    protocols: z.array(ProtocolSchema).nonempty(),
  }),
});
