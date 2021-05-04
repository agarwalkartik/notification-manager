const EmailNotificationService = require("./EmailNotificationService");

class NotificationService {
  constructor(mediums = []) {
    for (let medium of mediums) {
      this._mediumServices[medium.medium] = this._registerMediumService(medium);
    }
  }

  // private
  _mediumServices = {};

  _registerMediumService(medium) {
    switch (medium.medium) {
      case "email":
        return new EmailNotificationService(medium.params);
      default:
        throw new Error("Invalid Medium");
    }
  }

  // public
  validateMedium(medium) {
    if (!this._mediumServices[medium]) {
      throw new Error("Invalid Medium");
    }
    return true;
  }

  async sendNotification(medium, content, user) {
    this.validateNotification(medium, content, user);
    await this._mediumServices[medium].sendNotification(content, user);
    return true;
  }

  validateNotification(medium, content, user) {
    this.validateMedium(medium);
    this._mediumServices[medium].validateNotification(content, user);
    return true;
  }
}

module.exports = NotificationService;
