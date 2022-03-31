const { users } = require('./db');
const md5 = require('md5');

// exports.getUsers = () => {
//   return users;
// };
//
exports.getUserByMail = (email) => {
  const foundUser = users.find((user) => user.email === email);

  if (!foundUser) {
    throw new Error('User not found');
  }

  return foundUser;
};
//
// exports.createUser = (data) => {
//   const user = {
//     id: uuid.v4(),
//     firstName: data.firstName,
//     lastName: data.lastName,
//     password: md5(data.password),
//     role: data.role || 'member'
//   };
//
//   users.push(user);
// };
//
// exports.updateUser = (id, data) => {
//   const foundUser = users.find((user) => user.id === id);
//
//   if (!foundUser) {
//     throw new Error('User not found');
//   }
//
//   foundUser.firstName = data.firstName || foundUser.firstName;
//   foundUser.lastName = data.lastName || foundUser.lastName;
//   foundUser.password = data.password ? md5(data.password) : foundUser.password;
// };
//
// exports.deleteUser = (id) => {
//   const userIndex = users.findIndex((user) => user.id === id);
//
//   if (userIndex === -1) {
//     throw new Error('User not found');
//   }
//
//   users.splice(userIndex, 1);
// }
