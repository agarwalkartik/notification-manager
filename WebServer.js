const express = require("express");
class WebServer {
  constructor({ port = 3000, notificationQueue }) {
    this.app = express();
    this.app.use(express.json());
    this.notificationQueue = notificationQueue;
    this.port = port;
  }

  sendNotification = (req, res) => {
    const body = req.body;
    try {
      this.notificationQueue.push(body);
      res.send({ success: true });
    } catch (error) {
      res.status(500).send(error);
    }
  };

  init() {
    this.app.post("/send-notification", this.sendNotification);
    this.app.listen(this.port, () => {
      console.log("App started");
    });
  }
}

module.exports = WebServer;
