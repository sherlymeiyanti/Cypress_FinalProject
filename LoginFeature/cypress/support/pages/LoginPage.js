class LoginPage {

    visit(url){
        cy.visit(url, { failOnStatusCode: false })
        cy.get('input[name="username"]', { timeout: 15000 }).should('be.visible')
    }

    inputUsername(username){
        cy.get('input[name="username"]').clear().type(username)
    }

    inputPassword(password){
        cy.get('input[name="password"]').clear().type(password)
    }

    clickLogin(){
        cy.get('button[type="submit"]').click()
    }

    login(username, password){
        this.inputUsername(username)
        this.inputPassword(password)
        this.clickLogin()
    }

    pressEnterPassword(password){
        cy.get('input[name="password"]').clear().type(password + '{enter}')
    }

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
        cy.get('input[name="password"]').should('have.attr', 'type', 'password')
    }

    verifyLogo(){
        cy.get('img').should('be.visible')
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
