describe('RestaurantApp - foogle', () => {
    before(() => {
        cy.exec('npm run dev');
        cy.exec('npm run flush')
    })
    it('should be able to go to the signup page', () => {
        cy.visit('/signup')
        cy.get('div').contains('Signup')
    })
    it('should be able to fill in signup form', () => {
        cy.get('input[name="username"]')
        .type('applettins')
        .should('have.value', 'applettins');

        cy.get('input[name="email"]')
        .type('apple@mail.com')
        .should('have.value', 'apple@mail.com');

        cy.get('input[name="password"]')
        .type('mysuperpass65!')
        .should('have.value', 'mysuperpass65!')

        cy.get('form').submit()
    })

})