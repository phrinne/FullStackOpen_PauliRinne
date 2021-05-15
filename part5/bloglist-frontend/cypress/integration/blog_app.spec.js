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
})