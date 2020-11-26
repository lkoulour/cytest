/// <reference types="cypress" />

describe('List items pagination', () => {

    it('User access repo with token', () => {
        const accesstoken = Cypress.env('accesstoken')
        const repo = Cypress.env('repo')

        cy.visit('/')
        cy.get(':nth-child(1) > input').type(accesstoken)
        cy.get(':nth-child(2) > input').type(repo)
        cy.get('button').click()
        cy.url().should('include', '/issues')
    })

    it('List 5 items per request', () => {
        cy.request('/issues')
        cy.get('.styles_table__2oqWN > tbody').children().should('have.length', 5)
        cy.get('.styles_loadMoreWrapper__UNA_a > button').click({ force: true })
        cy.get('.styles_table__2oqWN > tbody').children().should('have.length', 10)
    })

})


