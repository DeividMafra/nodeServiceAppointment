# Password Recovery

**Functional Requirements**
- The end-user should be able to request a password recovery based on his email id;
- The end-user should be able to get password recovery instructions / link by email;
- The end-user should be able to reset his password.

**Non-Functional Requirements**
- Mailtrap for tests in Dev environment;
- Amazon Simple Email Service in Prod environment;
- Send email service should be a background job.

**Business Requirements**
- The recovery password link should valid for 2 hours;
- The end-user should be type the new password twice to confirm.

# Profile Update

**Functional Requirements**
- The end-user should be able to update name, email and password.

**Non-Functional Requirements**
-

**Business Requirements**
- The end-user should not be able to update the email id to an existent email id;
- The end-user should provide the current password to update it;
- The end-user should type the new password in two different fields to update it.

# Book a Service

**Functional Requirements**
- The end-user should be able to see a list of all registered service providers;
- The end-user should be able to see a list of all days which the chosen service provider has at least one spot available;
- The end-user should be able to see a list of all available time for that selected day;
- The end-user should be able to book a service.

**Non-Functional Requirements**
- The service providers list should be stored in cache;

**Business Requirements**
- An appointment should last exactly one hour;
- The first available spot should be at 8 am and the last at 5 pm;
- The end-user should not be able to book a service in a occupied time;
- The end-user should not be able to book a service in the past time;
- The end-user should not be able to book a service selecting himself as a service provider;

# Service Provider Dashboard

**Functional Requirements**
- The service provider should be able to see their appointments booked to a specific day;
- The service provider should be able to receive a notification when a new appointment is booked;
- The service provider should be able to identify unread notificztions.

**Non-Functional Requirements**
- The appointment list should be stored in cache;
- Notifications should be stored in MongoDB;
- Notifications should be sent in real-time using Socket.io.

**Business Requirements**
- Notifications should have a status (read / unread).
