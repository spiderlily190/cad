import { z } from "zod";

export const TOW_SCHEMA = z.object({
  location: z.string().min(2).max(255),
  description: z.string().optional().nullable(),
  descriptionData: z.any().optional().nullable(),
  creatorId: z.string().max(255).nullable().optional(),
  name: z.string().max(255).optional().nullable(),
  postal: z.string().max(255).optional().nullable(),
  plate: z.string().max(255).optional(),
  call911Id: z.string().max(255).optional(),
  deliveryAddress: z.string().max(255).optional(),
  callCountyService: z.boolean().optional(),
});

export const UPDATE_TOW_SCHEMA = TOW_SCHEMA.pick({
  location: true,
  description: true,
  descriptionData: true,
  postal: true,
  name: true,
}).extend({
  assignedUnitId: z.string().max(255).nullable(),
});
