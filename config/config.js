const url = new URL(process.env.SAML_CALLBACK)

module.exports = {
  development: {
    app: {
      name: 'Passport SAML strategy example',
      port: process.env.PORT || 3000
    },
    passport: {
      strategy: 'saml',
      saml: {
        path: url.pathname,
        entryPoint: process.env.SAML_ENTRY_POINT,
        issuer: 'passport-saml',
        callbackUrl: process.env.SAML_CALLBACK,
        cert: process.env.SAML_CERT,
        authnContext: 'http://schemas.microsoft.com/ws/2008/06/identity/authenticationmethod/windows',
        identifierFormat: "urn:oasis:names:tc:SAML:1.1:nameid-format:unspecified"
      }
    }
  }
};
