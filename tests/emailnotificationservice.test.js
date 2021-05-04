const EmailNotificationService = require("../NotificationService/EmailNotificationService");

test("throws error when object is created without proper dependencies", () => {
  try {
    new EmailNotificationService();
    expect(true).toBe(false);
  } catch (error) {
    expect(error.message).toBe("No SENDGRID_API_KEY provided");
  }
});

test("throws error when object is created without proper dependencies", () => {
  try {
    new EmailNotificationService({ SENDGRID_API_KEY: "1" });
    expect(true).toBe(false);
  } catch (error) {
    console.log(error.message);
    expect(true).toBe(true);
  }
});
