const users = require("./data/users.json");
const scheduledNotifications = require("./data/scheduledNotifications.json");

class NotificationScheduler {
  constructor({ notificationQueue, schedulerPeriod = 3000 }) {
    this.notificationQueue = notificationQueue;
    this._pollingFunction = this._pollingFunction.bind(this);
    schedulerPeriod = schedulerPeriod;
  }

  _fetchUsers() {
    return users;
  }

  _fetchScheduledNotifications() {
    return scheduledNotifications;
  }

  async _pollingFunction() {
    try {
      let users = this._fetchUsers();
      let scheduledNotifications = this._fetchScheduledNotifications();
      for (let scheduledNotification of scheduledNotifications) {
        for (let medium of scheduledNotification.mediums) {
          for (let user of users) {
            this.notificationQueue.push({ user, content: scheduledNotification.content, medium });
          }
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(this._pollingFunction, this.schedulerPeriod);
    }
  }

  init() {
    // this._pollingFunction();
  }
}

module.exports = NotificationScheduler;
