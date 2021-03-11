const crypto = require('crypto')
const seperatorForIVandContent = '/*/*=:-9*'

const algorithm = 'aes-256-ctr'
const secretKey = 'vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3'
const iv = crypto.randomBytes(16)

const encrypt = (text) => {
  const cipher = crypto.createCipheriv(algorithm, secretKey, iv)

  const encrypted = Buffer.concat([cipher.update(text), cipher.final()])

  return (
    iv.toString('hex') + seperatorForIVandContent + encrypted.toString('hex')
  )
}

const decrypt = (hash) => {
  hash = hash.split(seperatorForIVandContent)
  hash = { iv: hash[0], content: hash[1] }

  const decipher = crypto.createDecipheriv(
    algorithm,
    secretKey,
    Buffer.from(hash.iv, 'hex'),
  )

  const decrpyted = Buffer.concat([
    decipher.update(Buffer.from(hash.content, 'hex')),
    decipher.final(),
  ])

  return decrpyted.toString()
}

module.exports = {
  encrypt,
  decrypt,
}
