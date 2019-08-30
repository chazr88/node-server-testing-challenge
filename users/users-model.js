const db = require('../database/dbConfig');

module.exports = {
    insert,
    update,
    remove,
    getAll,
    findById,
  };
  
async function insert(user) {
    console.log(user)
    const [id] = await db('users').insert(user);
    return db('users').where({id}).first()
}
  
async function update(id, changes) {
    return null;
}
  
function remove(id) {
    // returns removed count
    return db('users')
      .where({ id })
      .del();
} 

function getAll() {
    // return db('users');
}
  
function findById(id) {
    return db('users')
        .where({id})
        // .first();
}
