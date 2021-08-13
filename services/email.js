var API_KEY = 'YOUR_API_KEY';
var DOMAIN = 'YOUR_DOMAIN_NAME';
var mailgun = require('mailgun-js')({apiKey: API_KEY, domain: DOMAIN});



async function createAndSendEmail({ email, labelLink }) {
  const data = {
    from: 'Excited User <me@samples.mailgun.org>',
    to: email,
    subject: 'Hello',
    text: 'Testing some Mailgun awesomeness!'
  };
}