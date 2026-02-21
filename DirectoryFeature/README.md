**Forgot Password Feature**

**Description:**

Automated tests for the Forgot Password feature on OrangeHRM demo site using Cypress (POM + intercept).

**Test Coverage:**

Page navigation: access reset page, Cancel button redirect

Input validations: empty username, spaces only, long input, special characters

API validation: intercept password reset request without redirect to prevent timeout

**Purpose:**

Verify reset password page accessibility, input validation, and successful server request handling without page reload issues.
