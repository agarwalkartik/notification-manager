const queue = require("fastq");

class NotificationQueue {
  constructor({ workerCount = 1, notificationService }) {
    this.notificationService = notificationService;
    this._taskQueue = queue(this._worker, workerCount);
  }

  // private
  _worker = async (message, cb) => {
    try {
      await this.notificationService.sendNotification(message.medium, message.content, message.user);
      cb(null, null);
    } catch (error) {
      console.log(error);
      cb(error);
    }
  };

  _taskQueue = null;

  // public
  push = (message) => {
    this.notificationService.validateNotification(message.medium, message.content, message.user);
    this._taskQueue.push(message);
  };
}
module.exports = NotificationQueue;
