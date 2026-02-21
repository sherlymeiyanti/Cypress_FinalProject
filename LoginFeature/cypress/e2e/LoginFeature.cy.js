import LoginPage from '../pages/LoginPage'

describe('Login Feature - OrangeHRM (POM + Intercept)', () => {

  let data

  before(() => {
    cy.fixture('login').then((loginData) => {
      data = loginData
    })
  })

  beforeEach(() => {
    LoginPage.visit()
  })

  // ==================================================
  // POSITIVE TEST CASES
  // ==================================================

  it('TC01 - Login with valid username and password', () => {

    LoginPage.interceptLogin()

    LoginPage.login(data.validUser, data.validPass)

    cy.wait('@loginRequest')
      .its('response.statusCode')
      .should('be.oneOf', [200, 302])

    LoginPage.verifyDashboard()
  })

  it('TC02 - Login using ENTER key', () => {

    LoginPage.interceptLogin()

    LoginPage.inputUsername(data.validUser)
    LoginPage.pressEnterPassword(data.validPass)

    cy.wait('@loginRequest')
      .its('response.statusCode')
      .should('be.oneOf', [200, 302])

    LoginPage.verifyDashboard()
  })

  // ==================================================
  // NEGATIVE TEST CASES
  // ==================================================

  it('TC03 - Login with empty username', () => {
    LoginPage.inputPassword(data.validPass)
    LoginPage.clickLogin()
    LoginPage.verifyRequired()
  })

  it('TC04 - Login with empty password', () => {
    LoginPage.inputUsername(data.validUser)
    LoginPage.clickLogin()
    LoginPage.verifyRequired()
  })

  it('TC05 - Login with invalid username', () => {

    LoginPage.interceptLogin()

    LoginPage.login(data.invalidUser, data.validPass)

    cy.wait('@loginRequest')
      .its('response.statusCode')
      .should('be.oneOf', [200, 302])

    LoginPage.verifyInvalid()
  })

  it('TC06 - Login with invalid password', () => {

    LoginPage.interceptLogin()

    LoginPage.login(data.validUser, data.invalidPass)

    cy.wait('@loginRequest')
      .its('response.statusCode')
      .should('be.oneOf', [200, 302])

    LoginPage.verifyInvalid()
  })

  it('TC07 - Login with invalid username and password', () => {

    LoginPage.interceptLogin()

    LoginPage.login(data.invalidUser, data.invalidPass)

    cy.wait('@loginRequest')
      .its('response.statusCode')
      .should('be.oneOf', [200, 302])

    LoginPage.verifyInvalid()
  })

  // ==================================================
  // UI TEST CASES
  // ==================================================

  it('TC08 - Password field should be hidden', () => {
    LoginPage.verifyPasswordHidden()
  })

  it('TC09 - Logo should be visible', () => {
    LoginPage.verifyLogo()
  })

  it('TC10 - Login form should be displayed', () => {
    LoginPage.verifyForm()
  })

  it('TC11 - Forgot Password link should navigate correctly', () => {
    LoginPage.clickForgotPassword()
  })

})
