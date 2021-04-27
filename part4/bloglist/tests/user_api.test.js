const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('ultimatesecret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
})

describe('when there is initially one user in db', () => {
    test('creation succeeds with a fresh username', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'trollman666',
            name: 'Pauli Rinne',
            password: 'salasana',
        }

        await api.post('/api/users').send(newUser).expect(200).expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
        const usernames = usersAtEnd.map(u => u.username)
        expect(usernames).toContain(newUser.username)
    })
    test('creation fails with proper statuscode and message if username already taken', async () => {
        const usersAtStart = await helper.usersInDb()
    
        const newUser = {
          username: 'root',
          name: 'Mr. Duplicate',
          password: 'salasana',
        }
    
        const result = await api.post('/api/users').send(newUser).expect(400).expect('Content-Type', /application\/json/)
        expect(result.body.error).toContain('`username` to be unique')
        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })
    test('creation fails with proper statuscode and message if username is missing', async () => {
        const usersAtStart = await helper.usersInDb()
    
        const newUser = {
          name: 'Mr. Duplicate',
          password: 'salasana',
        }
    
        const result = await api.post('/api/users').send(newUser).expect(400).expect('Content-Type', /application\/json/)
        expect(result.body.error).toContain('`username` is required')
        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })
    test('creation fails with proper statuscode and message if username is too short', async () => {
        const usersAtStart = await helper.usersInDb()
    
        const newUser = {
          username: 'ro',
          name: 'Mr. Duplicate',
          password: 'salasana',
        }
    
        const result = await api.post('/api/users').send(newUser).expect(400).expect('Content-Type', /application\/json/)
        expect(result.body.error).toContain('`username` (`ro`) is shorter than the minimum allowed length')
        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })
    test('creation fails with proper statuscode and message if password is missing', async () => {
        const usersAtStart = await helper.usersInDb()
    
        const newUser = {
          username: 'keke',
          name: 'Mr. Bad',
        }
    
        const result = await api.post('/api/users').send(newUser).expect(400).expect('Content-Type', /application\/json/)
        expect(result.body.error).toContain('password required')
        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })
    test('creation fails with proper statuscode and message if password is too short', async () => {
        const usersAtStart = await helper.usersInDb()
    
        const newUser = {
          username: 'keijo',
          name: 'Mr. Bad',
          password: 'sa',
        }
    
        const result = await api.post('/api/users').send(newUser).expect(400).expect('Content-Type', /application\/json/)
        expect(result.body.error).toContain('password minimum length is 3')
        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })
}) 

afterAll(() => {
    mongoose.connection.close()
})