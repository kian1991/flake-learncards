import { z } from 'zod';

export const CARD_MAX_CHARS = 225;
export const createCardFormSchema = z.object({
	id: z.string().optional(),
	front: z.string().min(1).max(CARD_MAX_CHARS),
	back: z.string().min(1).max(CARD_MAX_CHARS),
	tags: z.array(z.string()),
});

export const createStackFormSchema = z.object({
	name: z.string().min(1).max(128),
});
