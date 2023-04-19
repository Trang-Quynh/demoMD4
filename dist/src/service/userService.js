"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../entity/user");
class UserService {
    constructor() {
        this.getAll = async () => {
            let users = await user_1.User.find();
            return users;
        };
        this.checkUser = async (user) => {
            let userFind = await user_1.User.findOne({ username: user.username, password: user.password });
            return userFind;
        };
        this.createUser = async (user) => {
            let createdUser = await user_1.User.create(user);
            return createdUser;
        };
    }
}
exports.default = new UserService();
//# sourceMappingURL=userService.js.map