import { log } from 'console';
import { openDB } from 'idb'
import { Trip } from './models/Trip';

const DATABAE_NAME = 'Ionic';

initDB().then(() => { 
    console.log("Database initialized complete!");
});

export const insertTrip = async (trip: Trip) => {
    const db = await openDB(DATABAE_NAME, 1);
    await db.put('trips', trip);
}
export const updateTrip = async (trip: Trip) => {
    const db = await openDB(DATABAE_NAME, 1);
    await db.put('trips', trip);
}

export const getTripById = async (id: number) => { 
    const db = await openDB(DATABAE_NAME, 1);
    return await db.get('trips', id);
}

export const getAllTrip = async () => { 
    const db = await openDB(DATABAE_NAME, 1);
    return await db.getAll('trips');
}

export const deleteTrip = async (id: number) => {
    const db = await openDB(DATABAE_NAME, 1);
    return await db.delete('trips', id);
}

async function initDB() {
    const db = await openDB(DATABAE_NAME, 1, {
        upgrade(db) {
            const store = db.createObjectStore('trips', {
                keyPath: 'id',
                autoIncrement: true
            })
        }
    });
}