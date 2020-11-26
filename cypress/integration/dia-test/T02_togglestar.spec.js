/// <reference types="cypress" />

describe('Toggle Star Unstar repo', () => {

    it('User access repo with token', () => {
      const accesstoken = Cypress.env('accesstoken')
      const repo = Cypress.env('repo')

      cy.visit('/')
      cy.get(':nth-child(1) > input').type(accesstoken)
      cy.get(':nth-child(2) > input').type(repo)
      cy.get('button').click()
      cy.url().should('include', '/issues')
    })

    it('Toggle Star/Unstar Repo', () => {
      cy.get('.styles_star__18TfB > :nth-child(1)').then(($span) => {
        // capture stars counter
        const starcount = parseFloat($span.text())

        // toggle Star
        cy.get('.styles_star__18TfB > button').click({ force: true }).then(() => {

          // capture stars counter after toggle
          cy.get('.styles_star__18TfB > :nth-child(1)').then(($span) => {
            const unstarcount = parseFloat($span.text())
            expect(unstarcount).to.not.equal(starcount)
          })

        })

      })

    })

})