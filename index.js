const config = require("./config");

const NotificationQueue = require("./NotificationQueue");
const NotificationService = require("./NotificationService");
const NotificationScheduler = require("./NotificationScheduler");
const WebServer = require("./WebServer");

const mediums = [
  {
    medium: "email",
    params: { SENDGRID_API_KEY: config.SENDGRID_API_KEY, SENDER_EMAIL: config.SENDER_EMAIL },
  },
];

let notificationService = new NotificationService(mediums);

let notificationQueue = new NotificationQueue({ workerCount: 1, notificationService });

let notificationScheduler = new NotificationScheduler({ notificationQueue, schedulerPeriod: 10 * 1000 });

let webServer = new WebServer({ port: 3000, notificationQueue });
notificationScheduler.init();
webServer.init();

process.on("uncaughtException", (error) => {
  console.log(error);
});

process.on("unhandledRejection", (error) => {
  console.log(error);
});
