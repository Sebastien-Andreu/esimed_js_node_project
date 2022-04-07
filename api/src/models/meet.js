const daoMeet = require("../dao/DAOMeet");

module.exports.add = async (body) => {
    await daoMeet.add(body.date, body.idUser, body.idSession, body.idUserSession, body.note)
    return { status: 200, msg: 'meet created'}
};

module.exports.delete = async (idUser, idSession, idUserSession) => {
    await daoMeet.remove(idUser, idSession, idUserSession)
    return { status: 200, msg: 'User deleted'}
};

module.exports.get = async (idUserSession, idSession) => {
    return {status: 200, msg: await daoMeet.findById(idUserSession, idSession)};
};