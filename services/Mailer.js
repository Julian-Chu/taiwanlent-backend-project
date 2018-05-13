// @ts-check
'use strict'
const sendgrid = require('sendgrid');
const helper = sendgrid.mail;
const keys = require('../config/key');

class Mailer extends helper.Mail{
  constructor(user, content){
    super();

    this.sgApi = sendgrid(keys.sendGridKey);
    this.from_email = new helper.Email('no-reply@taiwanlent.com');
    this.subject = user.subject;
    this.body = new helper.Content('text/html', content);
    this.email = new helper.Email(user.email);

    this.addContent(this.body);
    this.addEmailToPersonalization();
  }

  addEmailToPersonalization(){
    const personalize = new helper.Personalization();
      personalize.addTo(this.email);
    this.addPersonalization(personalize);
  }

  async send(){
    const request = this.sgApi.emptyRequest({
      method: 'POST',
      path: '/v3/mail/send',
      body: this.toJSON()
    });
    let response;
    try{
      response = await this.sgApi.API(request);
    }catch(err){
      console.log('error:', err);
    }
    return response;
  }
}

module.exports = Mailer;
