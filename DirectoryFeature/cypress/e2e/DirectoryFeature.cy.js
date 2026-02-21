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
    it('TC01 - Directory page tampil', () => {
        cy.contains('Directory').should('be.visible')
    })


    // TC02
    it('TC02 - Data pegawai tampil', () => {
        DirectoryPage.employeeCards().should('exist')
    })


    // TC03
    it('TC03 - Search tanpa isi filter', () => {
        DirectoryPage.searchButton().click()
        DirectoryPage.employeeCards().should('exist')
    })


    // TC04
    it('TC04 - Search dengan nama valid', () => {
        DirectoryPage.employeeNameInput().type('Linda')
        DirectoryPage.searchButton().click()
        DirectoryPage.employeeCards().should('exist')
    })


    // TC05
    it('TC05 - Reset filter', () => {

        DirectoryPage.employeeNameInput().type('Linda')
        DirectoryPage.resetButton().click()

        DirectoryPage.employeeCards()
            .its('length')
            .should('be.gt', 0)
    })


    // TC06
    it('TC06 - Search nama tidak ada', () => {
        DirectoryPage.employeeNameInput().type('XYZ123ABC')
        DirectoryPage.searchButton().click()
        DirectoryPage.noRecordText().should('exist')
    })


    // TC07
    it('TC07 - Validasi API search dengan intercept', () => {

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