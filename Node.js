const accountSid = 'AC949c4fc18ca3013a23a8b05c25a75cbb';
const authToken = '[AuthToken]';
const client = require('twilio')(accountSid, authToken);

client.verify.v2.services("VAccd24b57d6be78fc8ee9499b61f74d22")
      .verificationChecks
      .create({to: '+917420031552', code: '[Code]'})
      .then(verification_check => console.log(verification_check.status));  