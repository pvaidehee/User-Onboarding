const { cyan } = require("color-name")

describe('Form Test', function(){
    it ('tests the required parameters for MVP', function(){
        cy.visit("http://localhost:3000/");
        cy.get('#name').type('Vaidehee').should('have.value', 'Vaidehee');
        cy.get('#email').type('pvaidehee@gmail.com');
        cy.get('#password').type('1234567');
        cy.get('#terms').check();
        cy.get("button").click();
    })
})