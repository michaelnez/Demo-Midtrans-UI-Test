var product_name = "Midtrans Pillow"

describe('UI Test of demo.midtrans.com', function() {
    before(function(){
        cy.visit('https://demo.midtrans.com/')
    })
    it('Assert URL is Correct', function(){
        cy.url().should('eq', 'https://demo.midtrans.com/')
    })
    it(`Assert Product ${product_name} Appeared`, function() {
        cy.get('[data-reactid=".0.0.0.2.0.0.0"]').should('have.text', product_name)
    })
    it('Click "Buy Now" Button', function() {
        cy.get('.buy').click()
    })
    it('Assert Product Added to Shopping Cart', function(){
        cy.get('[data-reactid=".0.0.1.0.0.1"]').should('be.exist').and('have.text', "1")
    })
})
