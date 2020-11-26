/// <reference types="cypress" />

describe('Minimal Github Repo Explorer', () => {

    it('User access repo with token', () => {
        const accesstoken = Cypress.env('accesstoken')
        const repo = Cypress.env('repo')

        cy.visit('/')
        cy.get(':nth-child(1) > input').type(accesstoken)
        cy.get(':nth-child(2) > input').type(repo)
        cy.get('button').click()
    })

    //Present the user with the following info for facebook/react repo 

    it('Repo description', () => {
        cy.request('/issues')
        cy.get('.styles_basicInfo__2HeY0 > h2').should('have.text', 'facebook / react')
        cy.get('h3').should('have.text', 'A declarative, efficient, and flexible JavaScript library for building user interfaces.')

    })

    it('Repo contains 3 lists', () => {
        cy.get('[href="/issues"]').should('contain', 'Issues')
        cy.get('[href="/pull-requests"]').should('contain', 'Pull Requests')
        cy.get('[href="/forks"]').should('contain', 'Forks')

    })

    it('Repo has a number of stars', () => {
        cy.get('.styles_star__18TfB > :nth-child(1)').then(($span) => {
            // capture Stars counter
            const starcount = parseFloat($span.text())
            cy.log(starcount)

        })
    })

    it('Top 3 programming languages used', () => {
        cy.get('.styles_languages__1lgNQ > h2').should('have.text', 'Languages distribution')
        cy.get('.legend-item-0 > .recharts-legend-item-text').should('have.text', 'JavaScript')
        cy.get('.legend-item-1 > .recharts-legend-item-text').should('have.text', 'HTML')
        cy.get('.legend-item-2 > .recharts-legend-item-text').should('have.text', 'CSS')

    })

})
