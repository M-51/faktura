import sqlite from 'sqlite'
import { createInterface } from 'readline';

const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
});

const askName = () => new Promise(resolve => rl.question('Name of customer? ', resolve));

const dbPromise = sqlite.open('testdb.sqlite', { Promise });

async function createDB() {
    const db = await dbPromise;
    await db.run('CREATE TABLE customers(id INTEGER PRIMARY KEY, name text, nip text)');
    db.close();
}


async function insertData(name) {
    const db = await dbPromise;
    try {
        db.run('INSERT INTO customers(name) VALUES(?)', name);
    } catch (error) {
        console.log(error);
    }
    db.close();
}


async function start() {
    const db = await dbPromise;
    const data = await db.all('SELECT name FROM customers');
    db.close();
    console.log(data);
}
export default start;
