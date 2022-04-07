const db = require('../models/db')

/**
 * return all UserSession not meet from the database
 * @params {int} idSession - id of Session
 */
const getAll = async function (id) {
    return db.select('*').from('UserSession').where({idSession: id}).whereNotExists(
        db.select("*").from("Meet").whereRaw('UserSession.id = Meet.idUserSession')
    )
}

/**
 * return all UserSession meet from the database
 * @params {int} idSession - id of Session
 */
const getAllMeet = async function (id) {
    return db.select('*').from('UserSession').where({idSession: id}).whereExists(
        db.select("*").from("Meet").whereRaw('UserSession.id = Meet.idUserSession')
    )
}

/**
 * return one UserSession with id from the database
 * @params {string} idUserSession - id of User in session
 */
const findById = async function (idUserSession) {
    return db.select('*').from('UserSession').where({id: idUserSession}).limit(1)
}

/**
 * add new UserSession in database
 * @params {string} name - name of user
 * @params {string} surname - surname of user
 * @params {string} sexe - sexe of user
 * @params {string} date - date of birthday of user
 */
const add = async function (name, surname, sexe, date, idSession) {
    await db.insert({name: name, surname: surname, sexe: sexe, date: date, idSession: idSession}).into('UserSession')
}

/**
 * delete UserSession in the database
 * @params {int} id - id of User
 */
const remove = async function (id) {
    await db.delete().from('UserSession').where({id: id})
}

/**
 * update UserSession in database
 * @params {int} id - id of User
 * @params {string} name - name of user
 * @params {string} surname - surname of user
 * @params {string} sexe - sexe of user
 * @params {string} date - date of birthday of user
 */
const update = async function (id, name, surname, sexe, date) {
    await db.from("UserSession").where({id: id}).update({name: name, surname: surname, sexe: sexe, date: date})
}

module.exports = {
    getAll,
    getAllMeet,
    findById,
    add,
    remove,
    update
}