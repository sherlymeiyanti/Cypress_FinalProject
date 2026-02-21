import ForgotPasswordPage from '../pages/ForgotPasswordPage'

describe('Forgot Password Feature - OrangeHRM (POM + Intercept)', () => {

  beforeEach(() => {
    ForgotPasswordPage.visitLoginPage()
    ForgotPasswordPage.clickForgotPassword()
  })

  it('TC01 - Reset page displayed', () => {
    ForgotPasswordPage.verifyResetPageDisplayed()
  })

  it('TC02 - Submit without username', () => {
    ForgotPasswordPage.clickReset()
    ForgotPasswordPage.verifyRequiredMessage()
  })

  it('TC03 - Submit with empty spaces', () => {
    ForgotPasswordPage.inputUsername('   ')
    ForgotPasswordPage.clickReset()
    ForgotPasswordPage.verifyRequiredMessage()
  })

  it('TC04 - Cancel button back to login', () => {
    ForgotPasswordPage.clickCancel()
    ForgotPasswordPage.verifyBackToLogin()
  })

  it('TC05 - Long username input', () => {
    const longUsername = 'A'.repeat(150)
    ForgotPasswordPage.inputUsername(longUsername)
    ForgotPasswordPage.clickReset()
    ForgotPasswordPage.verifyResetPageDisplayed()
  })

  it('TC06 - Special character username', () => {
    ForgotPasswordPage.inputUsername('@@@###')
    ForgotPasswordPage.clickReset()
    ForgotPasswordPage.verifyResetPageDisplayed()
  })

  it('TC07 - Intercept reset request without redirect (NO TIMEOUT)', () => {

    ForgotPasswordPage.interceptResetRequest()

    ForgotPasswordPage.inputUsername('Admin')
    ForgotPasswordPage.clickReset()

    cy.wait('@resetRequest')
      .its('response.statusCode')
      .should('eq', 200)

  })

})