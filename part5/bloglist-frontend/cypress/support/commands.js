Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', `${Cypress.env('BACKEND')}/login`, {
    username, password
  }).then(({ body }) => {
    localStorage.setItem('loggedBlogappUser', JSON.stringify(body))
    cy.visit('')
  })
})

Cypress.Commands.add('create', ({ title, author, url }) => {
  cy.contains('new blog').click()
  cy.get('#title').type(title)
  cy.get('#author').type(author)
  cy.get('#url').type(url)
  cy.get('#create').click()
})