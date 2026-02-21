class DirectoryPage {

    visitDirectory() {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/directory/viewDirectory')
    }

    employeeNameInput() {
        return cy.get('input[placeholder="Type for hints..."]').first()
    }

    searchButton() {
        return cy.contains('button', 'Search')
    }

    resetButton() {
        return cy.contains('button', 'Reset')
    }

    employeeCards() {
        return cy.get('.orangehrm-directory-card')
    }

    noRecordText() {
        return cy.contains('No Records Found')
    }
}

export default new DirectoryPage()