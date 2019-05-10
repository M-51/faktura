import { createInterface } from 'readline';
import { promises as fsPromises } from 'fs';

const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
});


const askName = () => new Promise(resolve => rl.question('Your name? ', resolve));

const askSurname = () => new Promise(resolve => rl.question('Your surname? ', resolve));


async function ask() {
    const name = await askName();
    const surname = await askSurname();
    rl.close();
    fsPromises.writeFile('out.txt', `Name: ${name}\nSurname: ${surname}`);
}

export default ask;
