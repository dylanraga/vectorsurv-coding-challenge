import { readDb } from './read';
import { StoreSchema, schemaFromKey } from './schema/store';
import { z } from 'zod';
import { writeFile } from 'fs/promises';
import path from 'path';

const storeFile = process.env.STORE_LOC || path.join(__dirname, './store.json');

// Simulation of writing to a db, using a local .json store
// Requires a copy of the file store first, then append to it
export async function writeToDb<T extends keyof StoreSchema>(
	key: T,
	newObj: z.infer<(typeof schemaFromKey)[T]>
) {
	const dbCopy = await readDb();

	if (!(key in dbCopy)) {
		throw new Error(`Key ${key} does not exist in store`);
	}

	const parsedObj = schemaFromKey[key].parse(newObj);
	dbCopy[key].push(parsedObj);

	await writeFile(storeFile, JSON.stringify(dbCopy));
}
