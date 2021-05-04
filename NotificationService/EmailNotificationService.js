const sgMail = require("@sendgrid/mail");
const validator = require("validator");

class EmailNotificationService {
  constructor(params = {}) {
    if (!params.SENDGRID_API_KEY) {
      throw new Error("No SENDGRID_API_KEY provided");
    }
    if (!validator.isEmail(params.SENDER_EMAIL)) {
      throw new Error("Invalid SENDER_EMAIL provided");
    }
    this.senderEmail = params.SENDER_EMAIL;
    sgMail.setApiKey(params.SENDGRID_API_KEY);
  }

  // public
  async sendNotification(content = {}, user = {}) {
    await sgMail.send({ to: user.emailAddress, from: this.senderEmail, subject: content.title, text: content.message, html: content.message });
  }

  validateNotification(content = {}, user = {}) {
    if (!validator.isEmail(user.emailAddress)) {
      throw new Error("Invalid target email address. Field `user.emailAddress`");
    }
    if (!content.title) {
      throw new Error("Invalid email subject. Field `content.title`");
    }
    if (!content.message) {
      throw new Error("Invalid email body text. Field `content.message`");
    }
    if (!content.message) {
      throw new Error("Invalid email body html. Field `content.message`");
    }
    return true;
  }
}

module.exports = EmailNotificationService;
