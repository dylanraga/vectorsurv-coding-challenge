import { readFile } from 'fs/promises';
import path from 'path';
import { StoreSchema } from './schema/store';

const storeFile = process.env.STORE_LOC || path.join(__dirname, './store.json');

export async function readDb() {
	const json = JSON.parse(await readFile(storeFile, 'utf8'));
	const parsedJson = StoreSchema.parse(json);

	return parsedJson;
}
