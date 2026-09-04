// set up request object
const request = require('supertest')
const app = require('../index') // get the app

// test suite for checking the /health endpoint
describe('Health tests', () => {
    // test to see the /health endpoint returns an "OK"
    test('/health returns ok', async () => {
        // AAA
        // Arrange
        const expectedMessage = "OK"
        const expectedCode = 200

        // Act (Don't forget it's async)
        const response = await request(app).get('/health')

        console.log(response)

        // Assert
        expect(response.body.message).toBe(expectedMessage)
        expect(response.statusCode).toBe(expectedCode)
    })
})