import DirectoryPage from '../pages/DirectoryPage'

describe('Directory Feature - OrangeHRM', () => {

    beforeEach(() => {

        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')

        cy.get('input[name="username"]').type('Admin')
        cy.get('input[name="password"]').type('admin123')
        cy.get('button[type="submit"]').click()

        cy.url().should('include', '/dashboard')

        DirectoryPage.visitDirectory()
        cy.url().should('include', '/directory/viewDirectory')
    })


    // TC01
    it('TC01 - Directory page should be displayed', () => {
        cy.contains('Directory').should('be.visible')
    })


    // TC02
    it('TC02 - Employee data should be displayed', () => {
        DirectoryPage.employeeCards().should('exist')
    })


    // TC03
    it('TC03 - Search without filter input', () => {
        DirectoryPage.searchButton().click()
        DirectoryPage.employeeCards().should('exist')
    })


    // TC04
    it('TC04 - Search with valid employee name', () => {
        DirectoryPage.employeeNameInput().type('Linda')
        DirectoryPage.searchButton().click()
        DirectoryPage.employeeCards().should('exist')
    })


    // TC05
    it('TC05 - Reset filter fields', () => {

        DirectoryPage.employeeNameInput().type('Linda')
        DirectoryPage.resetButton().click()

        DirectoryPage.employeeCards()
            .its('length')
            .should('be.gt', 0)
    })


    // TC06
    it('TC06 - Search with non-existing employee name', () => {
        DirectoryPage.employeeNameInput().type('XYZ123ABC')
        DirectoryPage.searchButton().click()
        DirectoryPage.noRecordText().should('exist')
    })


    // TC07
    it('TC07 - Validate search API response using intercept', () => {

        cy.intercept(
            'GET',
            '**/api/v2/directory/employees*'
        ).as('searchDirectory')

        DirectoryPage.searchButton().click()

        cy.wait('@searchDirectory')
            .its('response.statusCode')
            .should('eq', 200)
    })

})
