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
