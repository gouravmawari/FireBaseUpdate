const admin = require("firebase-admin");

const credentials = require("./firstporject-ca697-firebase-adminsdk-fbsvc-d2f9b7e948.json");
admin.initializeApp({
    credential: admin.credential.cert(credentials)
});
module.exports = admin;