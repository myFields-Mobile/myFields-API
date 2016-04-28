var nodemailer = require('nodemailer');
var username = process.env.GMAIL_USERNAME || undefined;
var password = process.env.GMAIL_PASSWORD || undefined;
var transporter = undefined;

if(username != undefined && password != undefined) {
  //create reusable transporter object using SMTP transport
  transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: username,
      pass: password
    }
  });
}


var sendMail = function(mailOptions) {
  // Exit if environment isn't setup
  if(transporter == undefined) {
    console.log("Dieddddd");
    return;
  }

  // setup e-mail data with unicode symbols
  /*var mailOptions = {
    from: 'Fred Foo ✔ <foo@blurdybloop.com>', // sender address
    to: 'bar@blurdybloop.com, baz@blurdybloop.com', // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello world ✔', // plaintext body
    html: '<b>Hello world ✔</b>' // html body
  };*/

  // send mail with defined transport object
  transporter.sendMail(mailOptions, function(error, info){
    if(error){
      return console.log(error);
    }

    console.log('Message sent: ' + info.response);
  });
};

module.exports = {
  sendMail: sendMail
};