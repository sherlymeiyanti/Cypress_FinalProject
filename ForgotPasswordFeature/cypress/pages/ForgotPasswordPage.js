class ForgotPasswordPage {

  forgotLink = '.orangehrm-login-forgot-header'
  usernameField = 'input[name="username"]'
  resetButton = '.orangehrm-forgot-password-button--reset'
  cancelButton = 'button[type="button"]'

  visitLoginPage() {
    cy.visit('https://opensource-demo.orangehrmlive.com/', {
      failOnStatusCode: false
    })
  }

  clickForgotPassword() {
    cy.get(this.forgotLink)
      .should('be.visible')
      .click()
  }

  inputUsername(username) {
    cy.get(this.usernameField)
      .clear()
      .type(username)
  }

  clickReset() {
    cy.get(this.resetButton)
      .click({ force: true })
  }

  clickCancel() {
    cy.get(this.cancelButton)
      .click()
  }

  // 🔥 INTERCEPT TANPA REDIRECT
  interceptResetRequest() {
    cy.intercept(
      'POST',
      '**/auth/requestResetPassword',
      {
        statusCode: 200,   // kita ubah jadi 200 supaya tidak redirect
        body: {}
      }
    ).as('resetRequest')
  }

  verifyResetPageDisplayed() {
    cy.contains('Reset Password').should('be.visible')
  }

  verifyRequiredMessage() {
    cy.contains('Required').should('be.visible')
  }

  verifyBackToLogin() {
    cy.location('pathname')
      .should('include', '/auth/login')
  }
}

export default new ForgotPasswordPage()