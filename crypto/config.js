const crypto = require('crypto');
const bcrypt = require('bcrypt');
let Encriptada = "";
const algorithm = 'aes-256-ctr';
const ENCRYPTION_KEY = 'Est3EsMiT0K3n';
const IV_LENGTH = 16;



function encrypt(text) {
    const key = crypto.createHash('sha256').update(String(text)).digest('base64')
    const key_in_bytes = Buffer.from(key, 'base64')
    var tobeEncrypted = 'C0mPr0B4nt3';
    const iv = crypto.randomBytes(16).toString('hex').slice(0, 16);
    const cipher = crypto.createCipheriv('aes-256-ctr', key_in_bytes, iv);
    const encrypted = cipher.update(String(tobeEncrypted), 'utf8', 'hex') + cipher.final('hex')
    return iv.toString('hex') + ':' + encrypted.toString('hex');
}


Encriptada = encrypt(ENCRYPTION_KEY);
console.log(Encriptada)

let hash = bcrypt.hashSync(Encriptada, 16);

module.exports = {
    hash
};