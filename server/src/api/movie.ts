import express from 'express';

import { Movie } from '../db/schema/Movie';
import { readDb } from '../db/read';
import { writeToDb } from '../db/write';

const router = express.Router();

// Returns all movie items
router.get('/movies', async (req, res) => {
	const json = await readDb();
	res.json(json.movies);
});

// Create a movie item
router.post('/movies', (req, res) => {
	try {
		const movie = Movie.parse(req.body);
		writeToDb('movies', movie);

		res.json(movie);
	} catch (e) {
		res.status(400).send(e);
	}
});

export default router;
