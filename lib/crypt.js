const CryptoJS = require('crypto-js')

const cryptoKey = 'slkdnvnd.x/.vcm1'

function encrypt(word) {
    const key = CryptoJS.enc.Utf8.parse(cryptoKey)
    const srcs = CryptoJS.enc.Utf8.parse(word)
    const encrypted = CryptoJS.AES.encrypt(srcs, key, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7,
    })
    return encrypted.toString()
}

function decrypt(word) {
    const key = CryptoJS.enc.Utf8.parse(cryptoKey)
    const srcs = CryptoJS.enc.Utf8.stringify(word)
    const decrypt = CryptoJS.AES.decrypt(srcs, key, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7,
    })
    console.log(decrypt)
    return CryptoJS.enc.Utf8.stringify(decrypt).toString()
}

module.exports = {
    encrypt,
    decrypt,
}
