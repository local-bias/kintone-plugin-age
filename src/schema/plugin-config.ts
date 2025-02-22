import { z } from 'zod';

const PluginConfigV1Schema = z.object({
  version: z.literal(1),
  rows: z.array(
    z.object({
      src: z.string(),
      dst: z.string(),
      updates: z.boolean(),
    })
  ),
});

const PluginConditionV2Schema = z.object({
  srcFieldCode: z.string(),
  dstFieldCode: z.string(),
  isUpdateOnSave: z.boolean(),
});
const PluginConfigV2Schema = z.object({
  version: z.literal(2),
  conditions: z.array(PluginConditionV2Schema),
});

const PluginConditionV3Schema = z.object({
  ...PluginConditionV2Schema.shape,
  id: z.string(),
});
const PluginConfigV3Schema = z.object({
  version: z.literal(3),
  conditions: z.array(PluginConditionV3Schema),
});

export type PluginConfig = z.infer<typeof PluginConfigV3Schema>;
export type PluginCondition = PluginConfig['conditions'][number];

const AnyPluginConfigSchema = z.discriminatedUnion('version', [
  PluginConfigV1Schema,
  PluginConfigV2Schema,
  PluginConfigV3Schema,
]);
export type AnyPluginConfig = z.infer<typeof AnyPluginConfigSchema>;
