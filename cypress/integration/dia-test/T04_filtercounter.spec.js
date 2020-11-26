/// <reference types="cypress" />

describe('Filter', () => {

    it('User access repo with token', () => {
        const accesstoken = Cypress.env('accesstoken')
        const repo = Cypress.env('repo')

        cy.visit('/')
        cy.get(':nth-child(1) > input').type(accesstoken)
        cy.get(':nth-child(2) > input').type(repo)
        cy.get('button').click()
        cy.url().should('include', '/issues')
    })

    it('Filter Issues counter', () => {

        // Issues item counter reflects applied filter
        cy.get('[href="/issues"]').should('contain', 'Issues')
        cy.get('.styles_filter__1xfmi').should('have.value', 'open')
        cy.get('.styles_title__uhysM').then(($span) => {
            const counteropen = parseFloat($span.text())

            cy.get('.styles_filter__1xfmi').select('Closed').should('have.value', 'closed')
            cy.get('.styles_title__uhysM').then(($span) => {
                const counterclosed = parseFloat($span.text())
                expect(counterclosed).to.not.equal(counteropen)

                cy.get('.styles_filter__1xfmi').select('All').should('have.value', 'all')
                cy.get('.styles_title__uhysM').then(($span) => {
                    const counterall = parseFloat($span.text())
                    expect(counterall).to.equal(counterclosed + counteropen)

                })

            })

        })

    })

})
