/*describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
  })
})*/
describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Testi Juuseri',
      username: 'cypresshill',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('cypresshill')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()

      cy.contains('Testi Juuseri logged-in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('cypresshill')
      cy.get('#password').type('väärä')
      cy.get('#login-button').click()

      cy.contains('login failed')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'cypresshill', password: 'salainen' })
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('Uusi blogi Cypress')
      cy.get('#author').type('Blogman McBlog')
      cy.get('#url').type('https://www.altavista.com')
      cy.get('#create-blog-button').click()

      cy.contains('Uusi blogi Cypress')
    })

    describe('and several notes exist', function () {
      beforeEach(function () {
        cy.createBlog({ title: 'First blog', author: 'First Man', url: 'https://www.altavista.com' })
        cy.createBlog({ title: 'Second blog', author: 'Second Man', url: 'https://www.altavista.com' })
        cy.createBlog({ title: 'Third blog', author: 'Third Man', url: 'https://www.altavista.com' })
      })

      it.only('one of those can be liked', function () {
        cy.contains('Second blog').contains('view').click()
        cy.contains('Second blog').contains('like').click()

        cy.contains('Blog Second blog liked')
      })
    })
  })
})