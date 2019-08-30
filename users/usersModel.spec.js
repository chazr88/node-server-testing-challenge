const db = require('../database/dbConfig');
const Users = require('./users-model');

describe('users model', () => {//Goes to test.db3 because this is what wse are calling in the env. It is set up in the package.json
    describe('insert()', () => {

        beforeEach(async () => {
            await db('users').truncate();//Clears db so it runs a fresh test each time. Else it would add 2 every time and this test would fail.  
        })
        
        it('should insert 2 users', async () => {
            await Users.insert({username: 'gaffer', password: 'pass'});
            await Users.insert({username: 'sam', password: 'pass'});

            const users = await db('users');
            expect(users).toHaveLength(2);
        })
    })

    
    describe('remove()', () => {
        beforeEach(async () => {
            await db('users').truncate();//Clears db so it runs a fresh test each time. Else it would add 2 every time and this test would fail.  
        })
        it('should remove user', async () => {
            await Users.insert({id: 679, username: 'jeff', password: 'pass'});
            await Users.remove(679)
            
            const user = await Users.findById(679)
            expect(user).toHaveLength(0)
        })
    })
})