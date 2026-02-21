**Login Feature**

**Description:**
Automated tests for the login functionality of OrangeHRM demo site using Cypress with Page Object Model (POM) and intercept.

**Test Coverage:**
Positive cases: valid login, login via ENTER key
Negative cases: empty username, empty password, invalid credentials
UI validations: password field hidden, logo visibility, form presence, Forgot Password link functionality
API validation using intercept to ensure request success

**Purpose:**
Ensure login works correctly under valid and invalid scenarios, verify UI elements, and validate server communication.
