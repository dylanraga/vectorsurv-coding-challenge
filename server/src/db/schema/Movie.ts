import { z } from 'zod';

export const movieGenres = [
	'Action',
	'Animation',
	'Comedy',
	'Drama',
	'Historical',
	'Horror',
	'Sci-Fi',
] as const;

export const MovieGenre = z.enum(movieGenres, {
	errorMap: () => ({ message: 'Invalid genre' }),
});
export type MovieGenre = z.infer<typeof MovieGenre>;

export const Movie = z.object({
	title: z.string().min(1, 'Invalid title'),
	date: z.coerce.date(),
	rating: z.coerce
		.number()
		.min(1, 'Rating must be between 1–10')
		.max(10, 'Rating must be between 1–10'),
	genre: MovieGenre,
	studioEmail: z.string().email(),
});

export type Movie = z.infer<typeof Movie>;
