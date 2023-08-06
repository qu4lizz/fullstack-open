describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      username: 'Adam555',
      password: 'adam'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
    cy.visit('')
  })

  it('Login from is shown', function() {
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('Adam555')
      cy.get('#password').type('adam')
      cy.get('#login-button').click()
      cy.contains('Successful login')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('Adam555')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()
      cy.contains('Wrong credentials')
    })
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'Adam555', password: 'adam' })
      cy.create({ title: 'First class tests',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html' })
    })

    it('a new blog can be created', function() {
      cy.contains('First class tests')
    })

    it('user can like a blog', function() {
      cy.contains('First class tests').click()
      cy.contains('view').click()
      cy.contains('0')
      cy.get('#like-button').click()
      cy.contains('1')
    })

    it('user who created a blog can delete it', function() {
      cy.contains('First class tests').click()
      cy.contains('view').click()
      cy.get('#delete').click()

      cy.get('html').should('not.contain', 'First class tests - Edsger W. Dijkstra')
    })

    it('user cannot delete blogs that he did not create', function() {
      const user2 = {
        username: 'user2',
        password: 'user2'
      }
      cy.request('POST', `${Cypress.env('BACKEND')}/users`, user2)
      cy.contains('logout').click
      cy.login({ username: user2.username, password: user2.password })

      cy.contains('view').click
      cy.get('remove').should('not.exist')
    })
  })

  describe('Blogs ordered by number of likes', function() {
    beforeEach(function() {
      cy.login({ username: 'Adam555', password: 'adam' })
      cy.create({ author: 'John Doe', title: 'test1', url: 'http://example.com./test1' })
      cy.create({ author: 'John Doe', title: 'test2', url: 'http://example.com./test2' })
      cy.create({ author: 'Jane Doe', title: 'test3', url: 'http://example.com./test3' })

      cy.contains('test1').parent().as('blog1')
      cy.contains('test2').parent().as('blog2')
      cy.contains('test3').parent().as('blog3')
    })

    it('they are ordered by number of likes', function() {
      cy.get('@blog1').contains('view').click()
      cy.get('@blog2').contains('view').click()
      cy.get('@blog3').contains('view').click()
      cy.get('@blog1').contains('like').as('like1')
      cy.get('@blog2').contains('like').as('like2')
      cy.get('@blog3').contains('like').as('like3')

      cy.get('@like2').click()
      cy.wait(500)
      cy.get('@like1').click()
      cy.wait(500)
      cy.get('@like1').click()
      cy.wait(500)
      cy.get('@like3').click()
      cy.wait(500)
      cy.get('@like3').click()
      cy.wait(500)
      cy.get('@like3').click()
      cy.wait(500)

      cy.get('.blog').then(blogs => {
        cy.wrap(blogs[0]).contains('3')
        cy.wrap(blogs[1]).contains('2')
        cy.wrap(blogs[2]).contains('1')
      })
    })
  })
})