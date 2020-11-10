const url = new URL(process.env.SAML_CALLBACK)
const fs = require('fs')

const read1LineCert = filename => fs.readFileSync(filename, 'utf-8').replace('-----BEGIN CERTIFICATE-----','').replace('-----END CERTIFICATE-----','').replace(/\r\n/g,'')

module.exports = {
    app: {
        name: 'Nova UI',
        port: process.env.PORT || 3000
    },
    passport: {
        strategy: 'saml',
        saml: {
            path: url.pathname,
            entryPoint: process.env.SAML_ENTRY_POINT,
            issuer: process.env.SAML_ISSUER,
            callbackUrl: process.env.SAML_CALLBACK,
            cert: process.env.SAML_CERT,
            authnContext: 'http://schemas.microsoft.com/ws/2008/06/identity/authenticationmethod/windows',
            identifierFormat: "urn:oasis:names:tc:SAML:1.1:nameid-format:unspecified",
            signatureAlgorithm: 'sha512',
            privateKey: fs.readFileSync(process.env.SAML_SIGN_KEY, 'utf-8'),
            signingCert: read1LineCert(process.env.SAML_SIGN_CERT),
            decryptionPvk: fs.readFileSync(process.env.SAML_DECRYPT_KEY, 'utf-8'),
            decryptionCert: read1LineCert(process.env.SAML_DECRYPT_CERT)
        }
    }
};
