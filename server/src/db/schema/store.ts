import z from 'zod';
import { Movie } from './Movie';

export const StoreSchema = z.object({
	movies: Movie.array(),
});

export type StoreSchema = z.infer<typeof StoreSchema>;

export const schemaFromKey = {
	movies: Movie,
} as const;
