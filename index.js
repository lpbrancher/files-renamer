const fs = require('fs-extra');
const path = require('path');
const directory = './rename_this';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function renameFiles() {
    try {
        let files = await fs.readdir(directory);

        // EXAMPLE OF FILTERING FOR MP3 FILES
        // files = files.filter(file => path.extname(file).toLowerCase() === '.mp3');

        // THE REGEXP USED TO RENAME THE FILES
        let regexp = /[a-z][0-9]/;

        for (let i = 0; i < files.length; i++) {
            const oldName = path.join(directory, files[i]);
            files[i] = files[i].replace(regexp, '');
            files[i] = files[i].replaceAll(' ', '_');
            const newName = path.join(directory, files[i]);
            await fs.rename(oldName, newName);
            console.log(`Renamed ${oldName} to ${newName}`);
        }
        console.log('All files renamed succesfully 🫡');
        process.exit();
    }
    catch (err) {
        console.error('Oops! This didn\'t work. Error: ', err);
        process.exit();
    }
}

renameFiles();