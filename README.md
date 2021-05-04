# Notification Manager

The service manages scheduled notifications and also allows admin to add ad-hoc notifications as per their needs.


# Components

The service is divided into multiple sub components for easy maintenance and extensibility.

## Notification Service

The notification service class is an aggregation of all the smaller medium based sender services like "Email Notification Service". This service is exposed to other services so that a common wrapper is exposed to handle all type of notification mediums.

## Email Notification Service (Medium Sender Service)

The Email Notification Service handles all the logic of sending notifications via "email medium". The main tasks of this service are to validate a notification and to send any validated notification of "email" medium.
Note: To integrate more mediums we can mimic the email notification service example. Which makes integrating new mediums very easy.


## Notification Scheduler

A scheduler runs a periodic task to fetch all the schedule notifications and all the users in our inventory (json file for simplicity, can be any database in real apps), and adds them to the notification queue. 

## Notification Queue

The notification queue, is a simple queue based approach to send notifcations. The benefits of using a queuing approach here is, we have decoupled the sending logic and its asynchronous behaviour from the main app. Now any service can just send notification by just pushing it in the queue. Queues are also helpful in managing retries in various cases, like when third party server is down. 

## Web Service

The web service is provided for admins to send ad-hoc notifications. The api can be accessed using a `POST` call to `/send-notification` end point using following payload
```{
"content": {
 	"title": "Hello",
	"message": "hello"
  },
"user": {
	"emailAddress": "kartikagarwal.1993@gmail.com"
  },
"medium": "email"
}
```
The web service also uses the notification queue menioned above.

## Flow Diagram
![alt text](https://github.com/agarwalkartik/notification-manager/blob/e2a772473a99912bef773f32e84727171de02748/flowdiagram.png)

