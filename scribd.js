const util = require('util');
const exec = util.promisify(require('child_process').exec);

function bukaDiChrome(link) {
    return exec(`start chrome ${link}`)
        .then(() => {
            console.log(`Berhasil membuka link di Google Chrome.`);
        })
        .catch((err) => {
            console.error(`Terjadi kesalahan: ${err}`);
        });
}

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Masukkan ID dokumen Scribd: ', async (idDokumen) => {
    const linkScribd = buatLinkScribd(idDokumen);
    console.log("Berikut adalah link Scribd yang dibuat:");
    console.log(linkScribd);
    
    try {
        await bukaDiChrome(linkScribd);
    } catch (error) {
        console.error(`Terjadi kesalahan saat membuka link di Google Chrome: ${error}`);
    } finally {
        rl.close();
    }
});

function buatLinkScribd(idDokumen) {
    const accessKey = 'key-fFexxf7r1bzEfWu3HKwf'; 
    const startPage = 1;
    const viewMode = 'scroll';
    
    const link = `https://www.scribd.com/embeds/${idDokumen}/content?start_page=${startPage}&view_mode=${viewMode}&access_key=${accessKey}`;
    
    return link;
}
