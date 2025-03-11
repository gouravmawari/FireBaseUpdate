const admin = require("firebase-admin");

const credentials = require("");
admin.initializeApp({
    credential: admin.credential.cert(credentials)
});
module.exports = admin;