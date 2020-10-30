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
    samlStrategy.generateServiceProviderMetadata(process.env.SAML_SIGNING_CERT, process.env.SAML_DECREPTION_CERT)
  )
  passport.use(samlStrategy);

};
