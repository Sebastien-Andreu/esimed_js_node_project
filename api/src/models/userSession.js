const daoUserSession = require("../dao/DAOUserSession"); //require

module.exports.add = async (body) => {
    await daoUserSession.add(body.name, body.surname, body.sexe, body.date, body.idSession)
    return { status: 200, msg: 'User created'}
};


module.exports.delete = async (id) => {
    await daoUserSession.remove(id)
    return { status: 200, msg: 'User deleted'}
};


module.exports.get = async (idSession) => {
    return { status: 200, msg: await daoUserSession.getAll(idSession)}
};

module.exports.getMeet = async (idSession) => {
    return { status: 200, msg: await daoUserSession.getAllMeet(idSession)}
};