class LoginPage {

    // ===== SELECTOR =====
    usernameField = 'input[name="username"]'
    passwordField = 'input[name="password"]'
    loginButton = 'button[type="submit"]'
    logoImage = 'img'

    // ===== VISIT =====
    visit(){
        cy.visit('https://opensource-demo.orangehrmlive.com/')
        cy.get(this.usernameField, { timeout: 15000 }).should('be.visible')
    }

    // ===== INTERCEPT =====
    interceptLogin(){
        cy.intercept('POST', '**/auth/validate')
          .as('loginRequest')
    }

    // ===== ACTION =====
    inputUsername(username){
        cy.get(this.usernameField).clear().type(username)
    }

    inputPassword(password){
        cy.get(this.passwordField).clear().type(password)
    }

    clickLogin(){
        cy.get(this.loginButton).click()
    }

    pressEnterPassword(password){
        cy.get(this.passwordField).clear().type(password + '{enter}')
    }

    login(username, password){
        this.inputUsername(username)
        this.inputPassword(password)
        this.clickLogin()
    }

    // ===== VERIFICATION =====
    verifyDashboard(){
        cy.url().should('include', '/dashboard')
        cy.contains('Dashboard').should('be.visible')
    }

    verifyRequired(){
        cy.contains('Required').should('be.visible')
    }

    verifyInvalid(){
        cy.contains('Invalid credentials').should('be.visible')
    }

    verifyPasswordHidden(){
        cy.get(this.passwordField)
          .should('have.attr', 'type', 'password')
    }

    verifyLogo(){
        cy.get(this.logoImage).should('be.visible')
    }

    clickForgotPassword(){
        cy.contains('Forgot your password?').click()
        cy.url().should('include', 'requestPasswordResetCode')
    }

    verifyForm(){
        cy.get('form').should('exist')
    }
}

export default new LoginPage()