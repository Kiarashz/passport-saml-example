const SamlStrategy = require('passport-saml').Strategy;
const fs = require('fs')

module.exports = function (passport, config) {

  passport.serializeUser(function (user, done) {
    console.log('serializeUser')
    console.log(user)
    done(null, user);
  });

  passport.deserializeUser(function (user, done) {
    console.log('deserializeUser')
    done(null, user);
  });

  const samlStrategy = new SamlStrategy(
    config.passport.saml,
    function (profile, done) {
      console.log('profile')
      console.log(profile)
      console.log('Assertion')
      console.log(profile.getAssertionXml())
      return done(null,
        {
          id: profile.uid,
          email: profile.email,
          displayName: profile.cn,
          firstName: profile.givenName,
          lastName: profile.sn
        });
  })
  
  console.log(
    samlStrategy.generateServiceProviderMetadata(config.passport.saml.decryptionCert, config.passport.saml.signingCert)
  )
  passport.use(samlStrategy);

};
