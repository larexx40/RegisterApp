const Enum = require('enum');


const userType = new Enum({ MEMBER: 0, ADMIN: 1, WORKER: 2 }, { freeze: true, ignoreCase: true });
module.exports = { userType };