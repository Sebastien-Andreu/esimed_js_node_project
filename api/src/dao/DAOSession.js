const db = require('../models/db')

/**
 * return all session from the database
 */
const getAll = async function () {
    return db.select('*').from('Session')
}

/**
 * return one session with id user from the database
 * @params {int} id - id of User
 */
const findById = async function (id) {
    return db.select('*').from('Session').where({idUser: id})
}

/**
 * add new session in database
 * @params {string} date - date of creation
 * @params {int} id - id of User
 * */
const add = async function (date, id) {
    await db.insert({date: date, idUser: id}).into('Session')
}

/**
 * delete User in the database
 * @params {int} id - id of User
 */
const remove = async function (id) {
    await db.delete().from('Session').where({idUser: id})
}

module.exports = {
    getAll,
    findById,
    add,
    remove,
}