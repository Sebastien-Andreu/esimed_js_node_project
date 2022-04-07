const db = require('../models/db')

/**
 * return all session from the database
 * @params {int} idUser - id of User
 * @params {int} idSession - id of Session
 */
const getAll = async function (idUser, idSession) {
    return db.select('*').from('Meet').where({idUser: idUser, idSession: idSession})
}

/**
 * return one Meet with id user from the database
 * @params {int} id - id of User
 */
const findById = async function (idUserSession, idSession) {
    return db.select('*').from('Meet').where({idUserSession: idUserSession, idSession: idSession}).limit(1)
}

/**
 * add new session in database
 * @params {string} date - date of meet
 * @params {int} idUser - id of User
 * @params {int} idSession - id of Session
 * @params {int} idUserSession - id of UserSession
 * */
const add = async function (date, idUser, idSession, idUserSession, note) {
    await db.insert({date: date, idUser: idUser, idSession: idSession, idUserSession: idUserSession, note: note}).into('Meet')
}

/**
 * delete User in the database
 * @params {int} idUser - id of User
 * @params {int} idSession - id of Session
 * @params {int} idUserSession - id of UserSession
 */
const remove = async function (idUser, idSession, idUserSession) {
    await db.delete().from('Meet').where({idUser: idUser, idSession: idSession, idUserSession: idUserSession})
}

/**
 * update UserSession in database
 * @params {int} idUser - id of User
 * @params {int} idSession - id of Session
 * @params {int} idUserSession - id of UserSession
 * @params {int} note - note of UserSession
 */
const update = async function (idUser, idSession, idUserSession, note) {
    await db.from("Meet").where({idUser: idUser, idSession: idSession, idUserSession: idUserSession}).update({note: note})
}

module.exports = {
    getAll,
    add,
    remove,
    update,
    findById
}