const setpassword = require("../auth/setpassword.auth");

class PasswordRepositories {
    async set_password({ email }) {
        return await setpassword({ email });
    }
}

module.exports = new PasswordRepositories();
