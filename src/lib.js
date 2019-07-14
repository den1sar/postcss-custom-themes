
const fs = require('fs');

const readFile = from => fs.readFileSync(from, 'utf8');

module.exports = readFile;