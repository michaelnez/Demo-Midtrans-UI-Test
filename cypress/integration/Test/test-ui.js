var product_name = "Midtrans Pillow"

describe('UI Test of demo.midtrans.com', function() {
    before(function(){
        cy.visit('https://demo.midtrans.com/')
    })
    it('Verify URL is Correct', function(){
        cy.url().should('eq', 'https://demo.midtrans.com/')
    })
    it(`Verify Product ${product_name} Appeared`, function() {
        cy.get('[data-reactid=".0.0.0.2.0.0.0"]').should('have.text', product_name)
    })
    it('Click "Buy Now" Button', function() {
        cy.get('.buy')  .click()
    })
})
