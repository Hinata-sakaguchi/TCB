const fs = require('fs');
const path = require('path');
const AdmZip = require('adm-zip');
const { exec } = require('child_process');
const { DEVKITPRO_PATH } = require('../config');
const { sendErrorEmbed, sendSuccessMessage } = require('../utils/embedUtil');

async function processZipFile(fileName, userChannel, userId) {
    const extractionPath = `./extracted_${userId}`;
    fs.mkdirSync(extractionPath, { recursive: true });

    const zip = new AdmZip(fileName);
    zip.extractAllTo(extractionPath, true);

    exec('make', { cwd: extractionPath }, (error, stdout, stderr) => {
        if (error) sendErrorEmbed(userChannel, 'Build Error', error.message);
        else sendSuccessMessage(userChannel, extractionPath);
    });
}

module.exports = { processZipFile };
