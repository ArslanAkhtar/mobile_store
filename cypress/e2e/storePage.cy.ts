// https://on.cypress.io/api

//Note: wrote basic test for store page to check if it renders correctly
describe('Page rendered', () => {
  it('visits the app root url', () => {
    cy.visit('/')
    cy.contains('#app', 'Choose from 58 phones')
    cy.get('.product-list').children().should('have.length.above', 0)
  })
})
