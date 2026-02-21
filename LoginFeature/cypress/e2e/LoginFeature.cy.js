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
  // POSITIVE TEST CASE
  // ==================================================

  it('TC01 - Login valid', () => {

    LoginPage.interceptLogin()

    LoginPage.login(data.validUser, data.validPass)

    cy.wait('@loginRequest')
      .its('response.statusCode')
      .should('be.oneOf', [200, 302])

    LoginPage.verifyDashboard()
  })

  it('TC02 - Login menggunakan ENTER', () => {

    LoginPage.interceptLogin()

    LoginPage.inputUsername(data.validUser)
    LoginPage.pressEnterPassword(data.validPass)

    cy.wait('@loginRequest')
      .its('response.statusCode')
      .should('be.oneOf', [200, 302])

    LoginPage.verifyDashboard()
  })

  // ==================================================
  // NEGATIVE TEST CASE
  // ==================================================

  it('TC03 - Username kosong', () => {
    LoginPage.inputPassword(data.validPass)
    LoginPage.clickLogin()
    LoginPage.verifyRequired()
  })

  it('TC04 - Password kosong', () => {
    LoginPage.inputUsername(data.validUser)
    LoginPage.clickLogin()
    LoginPage.verifyRequired()
  })

  it('TC05 - Username salah', () => {

    LoginPage.interceptLogin()

    LoginPage.login(data.invalidUser, data.validPass)

    cy.wait('@loginRequest')
    .its('response.statusCode')
    .should('be.oneOf', [200, 302])

    LoginPage.verifyInvalid()
  })

  it('TC06 - Password salah', () => {

    LoginPage.interceptLogin()

    LoginPage.login(data.validUser, data.invalidPass)

    cy.wait('@loginRequest')
    .its('response.statusCode')
    .should('be.oneOf', [200, 302])

    LoginPage.verifyInvalid()
  })

  it('TC07 - Username dan Password salah', () => {

    LoginPage.interceptLogin()

    LoginPage.login(data.invalidUser, data.invalidPass)

    cy.wait('@loginRequest')
    .its('response.statusCode')
    .should('be.oneOf', [200, 302])

    LoginPage.verifyInvalid()
  })

  // ==================================================
  // UI TEST CASE
  // ==================================================

  it('TC08 - Password harus hidden', () => {
    LoginPage.verifyPasswordHidden()
  })

  it('TC09 - Logo tampil', () => {
    LoginPage.verifyLogo()
  })

  it('TC10 - Form login tampil', () => {
    LoginPage.verifyForm()
  })

  it('TC11 - Link Forgot Password berfungsi', () => {
    LoginPage.clickForgotPassword()
  })

})