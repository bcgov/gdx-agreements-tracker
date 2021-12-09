process.env.NODE_ENV = "test";
const request = require('supertest');
describe('loading express', () => {
    let server;
    beforeEach( () => {
        server = require('../../server')
    })
    afterEach(() => {
        server.close();
    })
    
    it('responsds to /', (done) => {
        request(server)
            .get('/')
            .expect(200, done)
    });
})
