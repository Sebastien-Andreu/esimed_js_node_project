const daoSession = require("../dao/DAOSession"); //require

module.exports.add = async (body) => {
    await daoSession.add(body.date, body.idUser)
    return { status: 200, msg: 'Session created'}
};

module.exports.find = async (idUser) => {
    return { status: 200, msg: await daoSession.findById(idUser)}
};