const product_name = "Midtrans Pillow"

const credit_card = {
    valid: {
        card_number: "4811111111111114",
        expire_date: "02/22",
        cvv_number: "123",
        bank_otp: "112233"
    },
    invalid: {
        card_number: "4811111111111113",
        expire_date: "02/22",
        cvv_number: "123",
        bank_otp: "112233"
    }
}

const success_message1 = "Thank you for your purchase."
const success_message2 = "Get a nice sleep."

//clickIframeElement: function for click element on outer Iframe 
const clickIframeElement = (element) => {
    cy.get('iframe').then($iframe => {
        const $body = $iframe.contents().find('body')
        cy.wrap($body)
        .find(element)
        .click()
    })
}

//clickIframeElement: function for type element on outer Iframe 
const typeIframeElement = (element, text) =>{
    cy.get('iframe').then($iframe => {
        const $body = $iframe.contents().find('body')
        cy.wrap($body)
        .find(element)
        .type(text)
    })
}

//getInnerIframeElement: function to get inner Iframe element
const getInnerIframeElement = () => {
    const outerIframe = cy.get('iframe')
      .its("0.contentDocument.body")
      .should("not.be.empty")
      .then(cy.wrap)
  
    const innerIframe = outerIframe
      .find('#application > div.container-fluid > div > div > div > iframe')
      .its("0.contentDocument.body")
      .should("not.be.empty")
      .then(cy.wrap)
  
    return innerIframe
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
    it('Input Credit Card Number', function() {
        typeIframeElement('#application > div.container-fluid > div > div > div > form > div:nth-child(2) > div.input-group.col-xs-12 > input[type=tel]', credit_card.valid.card_number)
    })
    it('Input Expiry Date', function() {
        typeIframeElement('#application > div.container-fluid > div > div > div > form > div:nth-child(2) > div.input-group.col-xs-7 > input[type=tel]', credit_card.valid.expire_date)
    })
    it('Input CVV Number', function() {
        typeIframeElement('#application > div.container-fluid > div > div > div > form > div:nth-child(2) > div.input-group.col-xs-5 > input[type=tel]', credit_card.valid.cvv_number)
    })
    it('Click "Pay Now" Button', function() {
        clickIframeElement('#application > div.button-main.show > a')
    })
    it('Input Bank OTP Number', function() {
        getInnerIframeElement().find('#PaRes').type(credit_card.valid.bank_otp)
    })
    it('Click "OK" Button' ,function() {
        getInnerIframeElement().find('#acsForm > div:nth-child(8) > div > button.btn.btn-sm.btn-success').click()
    })
    it('Assert Transaction Success, Verify Success Message', function() {
        cy.get('[data-reactid=".0.0.0.2.0.1.0.0:0"]', { timeout: 10000}).should('be.exist').and('have.text', success_message1)
        cy.get('[data-reactid=".0.0.0.2.0.1.0.0:2"]', { timeout: 10000}).should('be.exist').and('have.text', success_message2)
    })
})
