const admin = require("firebase-admin");

const credentials = require("./firstporject-ca697-firebase-adminsdk-fbsvc-94791b5e84.json");
admin.initializeApp({
    credential: admin.credential.cert(credentials)
});
module.exports = admin;