describe('Login user - RestaurantApp', () => {
    before(() => {
        cy.exec('npm run dev');
        cy.exec('npm run flush')
    })
    it('should be able to go to the login page', () => {
        cy.visit('/login')
        cy.get('div').contains('Login')
    })
    it('should be able to fill in the login form', () => {
        cy.get('input[name="username"]')
        .type('applettins')
        .should('have.value', 'applettins');
        cy.get('input[name="password"]')
        .type('mysuperpass65!')
        .should('have.value', 'mysuperpass65!')
        cy.get('form').submit()
    })

})