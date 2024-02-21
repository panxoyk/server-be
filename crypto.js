import { constants, generateKeyPairSync, privateDecrypt } from 'crypto'

export const generateKeys = () => {
    const key = generateKeyPairSync('rsa', { modulusLength: 2048 })
    const publicKey = key.publicKey.export({ format: 'pem', type: 'spki' })
    const privateKey = key.privateKey.export({ format: 'pem', type: 'pkcs1' }).toString()
    return { publicKey, privateKey }
}

export const decryptPassword = (password, key) => {
    const decrypted = privateDecrypt(
        {
            key,
            padding: constants.RSA_PKCS1_PADDING,
            oaepHash: 'sha256'
        },
        Buffer.from(password, 'base64')
    )
    return decrypted.toString()
}