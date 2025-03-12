const PasswordRepositories = require("../repositories/password.repositories");

class PasswordService {
    constructor(PasswordRepositories) {
        this.PasswordRepositories = PasswordRepositories;
    }

    async setPassword({ email }) { 
        return this.PasswordRepositories.set_password({ email });
    }
}

module.exports = new PasswordService(PasswordRepositories);
