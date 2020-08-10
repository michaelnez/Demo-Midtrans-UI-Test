const product_name = "Midtrans Pillow"

//clickIframeElement: function for click element on Iframe 
function clickIframeElement(element){
    cy.get('iframe').then($iframe => {
        const $body = $iframe.contents().find('body')
        cy.wrap($body)
        .find(element)
        .click()
    })
}

describe('UI Test of demo.midtrans.com', function() {
    before(function(){
        cy.visit('https://demo.midtrans.com/')
    })
    beforeEach(function() {
        //Before each function, preserve the cookie
        Cypress.Cookies.preserveOnce('_ga', '__cfduid', '_csrf', '_gid', '_gat')
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
    it('Click "Checkout" Button', function() {
        cy.get('[data-reactid=".0.0.1.1.0"]').click()
    })
    it('Click "Continue" on Iframe', function() {
        clickIframeElement('#application > div.button-main.show')
    })
    it('Click "Credit Card" as Payment Method', function() {
        clickIframeElement('#payment-list > div:nth-child(1) > a > div.list-content > div.list-title.text-actionable-bold')
    })
})
